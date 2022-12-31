import configparser
import re
from collections import defaultdict, Counter
from datetime import datetime
from pathlib import Path

CURR_DIR = Path(__file__).resolve().parent
BASE_DIR = CURR_DIR.parent
CONFIG_FILE = BASE_DIR / ".highdose.cnf"
LAST_READ_FILE = CURR_DIR / ".lastread.txt"

# Format:
# high-dose.net:443 2a02:3031:: - - [26/Nov/2022:06:12:07 +0100] "GET / HTTP/2.0" 304 0 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:107.0) Gecko/20100101 Firefox/107.0"
PATTERN = r'\S* (?P<ip>\S*) \S+ \S+ \[(?P<date>.*?)\] "\w+ (?P<url>\S+) \S+?" (?P<status>\d+)'
pattern = re.compile(PATTERN)

MONTH_NR = {
    k: v + 1
    for v, k in enumerate(
        "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split()
    )
}


def get_config() -> configparser.ConfigParser:
    if not CONFIG_FILE.exists():
        print("Error: Config file does not exist.")
        exit(0)
    config = configparser.ConfigParser(interpolation=None)
    config.read(CONFIG_FILE)
    return config


def get_last_read() -> str:
    with open(LAST_READ_FILE, "r") as infile:
        return infile.read()


def write_last_read(date: str):
    with open(LAST_READ_FILE, "r") as outfile:
        outfile.write(date)


def get_datetime(dt_str: str) -> datetime:
    """Return datetime from log string like '26/Nov/2022:06:12:07 +0100'"""
    # forget timezone
    d_str, hour, minute, second = dt_str.split()[0].split(":")
    day, month, year = d_str.split("/")
    return datetime(
        int(year),
        MONTH_NR[month],
        int(day),
        int(hour),
        int(minute),
        int(second),
    )


class AccessCounter:
    def __init__(self) -> None:
        self.successes = list()  # urls
        self.failures = list()
        self.success_ips = set()  # ips
        self.failure_ips = set()


days = defaultdict(AccessCounter)
last_processed = datetime(2000, 1, 1)
last_read = datetime(2000, 1, 1)


def process_access(ip: str, date: str, url: str, status: str, last_line: bool):
    """Return false if this date has been processed already"""
    global last_read
    dt = get_datetime(date)
    if dt <= last_processed:
        return False
    if last_line and dt > last_read:
        last_read = dt
    d = dt.date()
    if int(status) < 400:
        days[d].successes.append(url)
        days[d].success_ips.add(ip)
    else:
        days[d].failures.append(url)
        days[d].failure_ips.add(ip)
    return True


config = get_config()
for path in Path(config["high-dose"]["logs"]).iterdir():
    if path.name.startswith("access"):
        print(f"Reading {path}")
        with open(path, "r") as logfile:
            last_line = True
            lines = list(reversed(logfile.readlines()))
            print(len(lines), "lines")
            for line in lines:
                if line.startswith("high"):
                    print(line)
                    match = pattern.match(line)
                    if match is not None:
                        print("  ", line)
                        if not process_access(
                            last_line=last_line, **match.groupdict()
                        ):
                            break
                    last_line = False

# output_dir = Path(config["high-dose"]["output"])
with open(Path(config["high-dose"]["output"]) / "results.txt", "w") as outfile:

    def write(s):
        outfile.write(s + "\n")

    write("Auswertung highdose\n")
    successes = Counter()
    success_ips = set()
    failures = Counter()
    failure_ips = set()
    for day, ac in sorted(days.items()):
        write(f"\n{day}")
        write(f"{len(ac.successes)} Zugriffe")
        write(f"{len(ac.success_ips)} unterscheidbare IPs")
        write(f"{len(ac.failures)} fehlerhafte Zugriffe")
        write(f"{len(ac.failure_ips)} unterscheidbare IPs bei Fehlern")
        write("\nHäufigste URLs\n")
        sc = Counter(ac.successes)
        for url, count in sc.most_common(5):
            write(f"  {url}: {count}")
        successes += sc
        success_ips.update(ac.success_ips)
        failures += Counter(ac.failures)
        failure_ips.update(ac.failure_ips)
    write("\n\nGesamtauswertung\n")
    write("\nHäufigste URLs\n")
    for url, count in successes.most_common(5):
        write(f"  {url}: {count}")

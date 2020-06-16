import csv
import sys

def convert(filename):
    """Convert CSV file to JS format."""
    for row in csv.reader(open(filename)):
        print str(row) + ','

if __name__ == "__main__":
    convert(sys.argv[1])

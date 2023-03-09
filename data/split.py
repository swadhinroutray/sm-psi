import csv, random
input_file='top_1000_youtubers.csv'
db_file='db2.csv'
with open(input_file, 'r') as file:
    reader = csv.reader(file)
    for row in reader:
        with open(db_file, 'a') as db:
            if random.random() < 0.5:
                writer = csv.writer(db)
                writer.writerow(row)
print(db_file," created")    
                
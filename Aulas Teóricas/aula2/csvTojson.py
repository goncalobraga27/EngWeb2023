import json
import csv

with open("alunos.csv", "r") as file:
    csv_file = csv.reader(file, delimiter=';') 

    ps = []
    for line in csv_file:
        obj = {}
        obj["id"] = line[0]
        obj["nome"] = line[1]
        obj["github"] = line[2]
        ps.append(obj)
    
    alunos = {}
    alunos["alunos"] = ps     
    
    with open("alunos.json", "w") as out_file:
        json.dump(alunos, out_file, indent=2, ensure_ascii=False)        

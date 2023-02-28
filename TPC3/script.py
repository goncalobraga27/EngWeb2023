import json

identificador = 0
file = open("dataset-extra1.json")
struct = json.load(file)
pessoas = struct['pessoas']

for person in pessoas:
    person["id"] = "p"+str(identificador)
    identificador += 1

struct['pessoas'] = pessoas

with open("output.json", "w") as outfile:
    json.dump(struct, outfile)




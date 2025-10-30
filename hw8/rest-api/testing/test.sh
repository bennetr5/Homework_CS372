# posts account data (creates) (POST)
curl http://localhost:8080/accounts -H "Content-Type: application/json" -X POST -d '{"balance": 100, "name": "checking"}' -i
curl http://localhost:8080/accounts -H "Content-Type: application/json" -X POST -d '{"balance": 200, "name": "savings"}' -i

# gets account data (returns) (GET)
curl http://localhost:8080/accounts

# updates account data (PUT)
curl http://localhost:8080/accounts/1 -H "Content-Type: application/json" -X PUT -d '{"balance":300, "name":"savings"}' -i

# delete account data at specified id
curl http://localhost:8080/accounts/0 -X DELETE -i

# get account data again
curl http://localhost:8080/accounts
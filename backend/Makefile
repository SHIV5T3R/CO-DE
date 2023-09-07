# Commands retaining to set-up and teardown of a MongoDB Docker container
up:
	pipenv run python3 app.py
dbup:
	docker run --env mongodb_init_root_username=mongo --env mongodb_init_root_password=test -d -p 8081:27017 --name codemongo mongo:7.0.1
dbdown:
	docker rm -f codemongo
mongosh:
	docker exec -it codemongo mongosh
dbre:
	make dbdown && make dbup
dbseed:
	 curl -X POST http://localhost:5000/users -d '{"username":"test", "full_name":"testy testius", "email":"test@example.com", "password":"Password1!"}' -H 'content-type:application/json'

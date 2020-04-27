# Match sequence diagram
![Match sequence diagram](https://raw.githubusercontent.com/erickcouto/devquiz/master/backend/SequenceDiagram.png)

# Endpoints
### GET - /users/:githubuser
Gets or create a new user
###### Response - 200
```json
{
	"id": 1,
	"login": "githubuser",
	"name": "Primeiro segundo nome",
	"avatar": "http://imagem.png",
	"repos": 0
}
```
###### Response - 400
```json
{
	"errorCode": 1,
	"message": "This user doesn't exists!"
}
```
```json
{
	"errorCode": 2,
	"message": "An error has occured!",
	"error": {}
}
```

### GET - /match/create/:userId
Creates a new room
###### Response - 200
```json
{
	"matchId": 1,
  "matchCode": "874676"
}
```

###### Response - 400
```json
{
	"errorCode": 1,
	"message": "This user doesn't exists!"
}
```

### POST - /match/join
Joins a room
###### Request
```json
{
	"matchCode": 123456,
	"userId": 1
}
```
###### Response - 200
```json
{
	"matchId": 1
}
```

###### Response - 400
```json
{
	"errorCode": 1,
	"message": "This user doesn't exists!"
}
```
```json
{
	"errorCode": 3,
	"message": "This room code doesn't exists!"
}
```
```json
{
	"errorCode": 4,
	"message": "This room is full!"
}
```

```json
{
	"errorCode": 5,
	"message": "This room is already over!"
}
```
```json
{
	"errorCode": 2,
	"message": "An error has occured!",
	"error": {}
}
```

# Socket events

### (client) join-match
```json
{
	"userId" : 1,
	"matchId" : 1
}
```

### (server) player-joined
```json
{
	"owner": {
		"id": 1,
		"login": "githubuser",
		"name": "Primeiro segundo nome",
		"avatar": "http://imagem.png",
	"	repos": 0
},
	opponent: {
		"id": 1,
		"login": "githubuser",
		"name": "Primeiro segundo nome",
		"avatar": "http://imagem.png",
		"repos": 0
	}
}
```

### (client) set-ready
```json
{
	"userId" : 1,
	"matchId" : 1
}
```

### (server) player-ready
```json
{
	"userId": 1
}
```

### (server) match-start

### (server) match-start-round
```json
{
	"currentRound": 1,
	"totalRound": 5
}
```

### (server) match-start-question
```json
{
	"id": 0,
	"title": "Pergunta 01",
	"image": "http://image.png",
	"answer1": "Resposta 01",
	"answer2": "Resposta 02",
	"answer3": "Resposta 03",
	"answer4": "Resposta 04",
}
```

### (server) match-countdown
```json
{
	"seconds": 10
}
```

### (client) answer-question
```json
{
	"userId" : 1,
	"matchId" : 1,
	"questionId": 1,
	"answer":  1,
  "time":  5
}
```

### (server) match-round-end
```json
{
	"owner" : {
		"id": 1,
		"answer": 1,
		"score": 10
	},
	"opponent" : {
		"id": 2,
		"answer": 3,
		"score": 0
	},
	"correctAnswer": 1
}
```

### (server) match-end
```json
{
	"totalScore": 50,
	"wins": 5,
	"losses": 1
}
```

# Test client 

cd test_client

npm install

node client.js

# springboot-aws-rds
springboot-aws-rds

Log in to https://035183337884.signin.aws.amazon.com/console?region=us-east-1 or using the AWS CLI
$ 
$ printf 'Executed aws env script'
Executed aws env script$ 

Dependency

Lombok
web
jpa
mysql driver



RDS

DB instance identifier - mytechie



root
root12345


Endpoint
mytechie.c9cmcsqveuyh.us-east-1.rds.amazonaws.com

Port
3306

Availability Zone
us-east-1c


change - Inbound rules Info
of vpc - sgr-0c029c1eaeaa70f9c

MYSQL/Aurora - TCS 3306 Anywhere - 0.0.0.0/0
MYSQL/Aurora - TCS 3306 Anywhere - ::/0

-------------------------
mytechie2db.c9cmcsqveuyh.us-east-1.rds.amazonaws.com
instance - mytechie2db
db Name - mytechie2

admin
admin12345

http://localhost:5000/book   -- POST

{
	"name":"spring core09",
	"price": 7980
}

Building jar: C:\Users\user\Documents\GitHub\springboot-aws-rds\target\springboot-aws-rds-0.0.1-SNAPSHOT.jar

get it 

http://localhost:5000/book

[
    {
        "id": 1,
        "name": "spring core2",
        "price": 799
    },
    {
        "id": 2,
        "name": "spring core09",
        "price": 7980
    },
    {
        "id": 3,
        "name": "spring core010",
        "price": 7980
    }
]


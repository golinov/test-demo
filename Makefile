include .env


up: # create and start containers
	@docker-compose -f ${DOCKER_CONFIG} up -d

down: # stop and destroy containers
	@docker-compose -f ${DOCKER_CONFIG} down

down-volume: #  WARNING: stop and destroy containers with volumes
	@docker-compose -f ${DOCKER_CONFIG} down -v

start: # start already created containers
	@docker-compose -f ${DOCKER_CONFIG} start

stop: # stop containers, but not destory
	@docker-compose -f ${DOCKER_CONFIG} stop

ps: # show started containers and their status
	@docker-compose -f ${DOCKER_CONFIG} ps

build: # build all dockerfile, if not built yet
	@docker-compose -f ${DOCKER_CONFIG} build

connect_backend: # node command line
	@docker-compose -f ${DOCKER_CONFIG} exec -u node backend sh

connect_nginx: # nginx command line
	@docker-compose -f ${DOCKER_CONFIG} exec -w /www nginx sh

logs_backend:
	@docker-compose -f ${DOCKER_CONFIG} logs --follow backend

node_modules_backend:
	@docker-compose -f ${DOCKER_CONFIG} exec -u node backend sh -c "yarn"
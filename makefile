NAME:

run:
	docker compose up -d postgres adminer maildev redis
	yarn start:dev
migration-create:
	yarn migration:create src/database/migrations/create-$(NAME)

re-migrate:
	yarn schema:drop
	yarn migration:run

re-migrate-seed:
	yarn schema:drop
	yarn migration:run
	yarn seed:run
echo "script modules";
docker exec -i docker-mysql mysql -u root --password=123456 db_on_line_shop < ./database/scripts/modules.sql;

echo "script sub modules";
docker exec -i docker-mysql mysql -u root --password=123456 db_on_line_shop < ./database/scripts/modules_sub.sql;

echo "script roles";
docker exec -i docker-mysql mysql -u root --password=123456 db_on_line_shop < ./database/scripts/roles.sql;

echo "script roles permissions";
docker exec -i docker-mysql mysql -u root --password=123456 db_on_line_shop < ./database/scripts/roles_permissions.sql;

echo "script countries";
docker exec -i docker-mysql mysql -u root --password=123456 db_on_line_shop < ./database/scripts/countries.sql;

echo "script states";
docker exec -i docker-mysql mysql -u root --password=123456 db_on_line_shop < ./database/scripts/states.sql;

echo "script cities";
docker exec -i docker-mysql mysql -u root --password=123456 db_on_line_shop < ./database/scripts/cities.sql;

echo "script users";
docker exec -i docker-mysql mysql -u root --password=123456 db_on_line_shop < ./database/scripts/users.sql;
CREATE DATABASE database_links;

use database_links;

create table users(
    id int(11) not null,
    username VARCHAR(16) not NULL,
    PASSWORD VARCHAR(60)not NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    add PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT[11] NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
DESCRIBE users;

create table links(
    id int(11) not null,
    title varchar(150) not null,
    url varchar(255) not null,
    description text,
    user_id int(11),
    created_at TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);
alter table links
add PRIMARY KEY (id);

alter table links
    MODIFY id int[11] not null AUTO_INCREMENT,AUTO_INCREMENT=2;
describe links;
create table
diary_media (
  diary_id uuid REFERENCES diaries(id),
  media_id uuid REFERENCES media(id),
  PRIMARY KEY (diary_id, media_id)
);

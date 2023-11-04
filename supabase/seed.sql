INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
VALUES
  ('00000000-0000-0000-0000-000000000000', '5899f99d-a449-4bfa-8769-19c097aaf1f5', 'authenticated', 'authenticated', 'admin@email.com', '$2a$10$7HloIuRU8136LMux12Vceu8x57OuqrRDpUsIlHLjM4I85LwzUiHRm', '2022-10-04 03:41:27.39308+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);

INSERT INTO auth.identities (id,user_id,identity_data,provider,last_sign_in_at,created_at,updated_at)
VALUES
  ('5899f99d-a449-4bfa-8769-19c097aaf1f5', '5899f99d-a449-4bfa-8769-19c097aaf1f5'::uuid, '{"sub": "5899f99d-a449-4bfa-8769-19c097aaf1f5"}', 'email', '2022-10-04 04:45:00.000+00', '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00');

insert into
  public.diaries (id, user_id, written_date, title, content)
  values
  (
	'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
	'5899f99d-a449-4bfa-8769-19c097aaf1f5',
	'2021-01-01',
	'My first diary',
	'This is my first diary.'
  ),
  (
	'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
	'5899f99d-a449-4bfa-8769-19c097aaf1f5',
	'2021-01-02',
	'My second diary',
	'This is my second diary.'
  );

insert into
  public.questions (id, content)
  values
  (
	'f47ac10b-58cc-4372-a567-0e02b2c3d470',
	'自分はどのような性格であると考えますか？'
  ),
  (
	'f47ac10b-58cc-4372-a567-0e02b2c3d471',
	'周りからはどのような性格だと言われますか？'
  ),
  (
	'f47ac10b-58cc-4372-a567-0e02b2c3d472',
	'自分の性格がプラスに働いた場面はありますか？'
  ),
  (
	'f47ac10b-58cc-4372-a567-0e02b2c3d473',
	'自分の性格がマイナスに働いた場面はありますか？'
  ),
  (
	'f47ac10b-58cc-4372-a567-0e02b2c3d474',
	'自分の性格で好きな部分、嫌いな部分は何ですか？'
  ),
  (
	'f47ac10b-58cc-4372-a567-0e02b2c3d475',
	'普段は聞き手になることが多いですか？話し手になることが多いですか？'
  ),
  (
	'f47ac10b-58cc-4372-a567-0e02b2c3d476',
	'悩みがある時、周りに相談するタイプですか？'
  ),
  (
	'f47ac10b-58cc-4372-a567-0e02b2c3d477',
	'何をしている時に幸せだと感じますか？'
  ),
  (
	'f47ac10b-58cc-4372-a567-0e02b2c3d478',
	'周りから短所を指摘された時、どのように感じますか？'
  ),
  (
	'f47ac10b-58cc-4372-a567-0e02b2c3d479',
	'周りの人に対して注意ができる性格ですか？'
  ),
  (
	'f47ac10b-58cc-4372-a567-0e02b2c3d480',
	'どのような趣味がありますか？'
  ),
  (
	'f47ac10b-58cc-4372-a567-0e02b2c3d481',
	'いつ、どのようなきっかけでその趣味を持ちましたか？'
  ),
  (
	'f47ac10b-58cc-4372-a567-0e02b2c3d482',
	'趣味にはどれくらいの頻度で取り組んでいますか？'
  ),
  (
	'f47ac10b-58cc-4372-a567-0e02b2c3d483',
	'趣味を通して新たに得た人間関係や知識などはありますか？'
  ),
  (
	'f47ac10b-58cc-4372-a567-0e02b2c3d484',
	'一番長く続いている趣味は何ですか？'
  ),
  (
	'f47ac10b-58cc-4372-a567-0e02b2c3d485',
	'一番長く続いている趣味はいつからのものですか？'
  ),
  (
	'f47ac10b-58cc-4372-a567-0e02b2c3d486',
	'1つの趣味を極める方ですか？多くの趣味を楽しむ方ですか？'
  ),
  (
	'f47ac10b-58cc-4372-a567-0e02b2c3d487',
	'働き始めてからは、どのように趣味を続けていきたいですか？'
  ),
  (
	'f47ac10b-58cc-4372-a567-0e02b2c3d488',
	'自分にとって趣味とはどのようなものですか？'
  ),
  (
	'f47ac10b-58cc-4372-a567-0e02b2c3d489',
	'子供の頃の趣味は何ですか？'
  );
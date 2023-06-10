CREATE TABLE Entidade (
  idEntidade SERIAL  NOT NULL ,
  nome VARCHAR(300)   NOT NULL ,
  cgc VARCHAR(12)   NOT NULL ,
  senha CHAR(64)   NOT NULL ,
  cadastro DATE    ,
  ultimoLogin DATE      ,
PRIMARY KEY(idEntidade));

CREATE TABLE bancos (
  idbanco SERIAL  NOT NULL ,
  nome VARCHAR(200)    ,
  codigo VARCHAR(3)      ,
PRIMARY KEY(idbanco));

insert into bancos(idbanco, nome, codigo)values(1, 'Outro', '000');
INSERT INTO bancos (nome, codigo) VALUES
('Banco Bradesco', '237'),
('Banco Votorantim', '655'),
('Banco BMG', '318'),
('Banco do Estado do RS', '041'),
('Banco Inter', '077'),
('Banco Daycoval', '707'),
('Banco Original', '212'),
('Banco C6', '336'),
('Banco Banrisul', '041'),
('Banco Credicoamo', '097'),
('Banco Pine', '643'),
('Banco Pan', '623'),
('Banco ABC Brasil', '246'),
('Banco Modal', '746'),
('Banco Fibra', '224'),
('Banco Topázio', '082'),
('Banco J. Safra', '074'),
('Banco Semear', '743'),
('Banco Rendimento', '633'),
('Banco CBSS', '320'),
('Banco Original', '212'),
('Banco C6 Bank', '336');

commit;

CREATE TABLE Meta (
  idEntidade BIGINT   NOT NULL ,
  idMeta BIGINT   NOT NULL ,
  titulo VARCHAR(100)   NOT NULL ,
  descricao TEXT   NOT NULL ,
  vezesCopiado BIGINT  DEFAULT 0 NOT NULL ,
  encerrado BOOL  DEFAULT False NOT NULL ,
  dataFim DATE    ,
  dataInicio DATE   NOT NULL   ,
PRIMARY KEY(idEntidade, idMeta)  ,
  FOREIGN KEY(idEntidade)
    REFERENCES Entidade(idEntidade)
      ON DELETE CASCADE
      ON UPDATE CASCADE);

CREATE INDEX FK_entidade ON Meta (idEntidade);

CREATE INDEX IFK_publica ON Meta (idEntidade);

CREATE TABLE Perfil (
  idPerfil SERIAL  NOT NULL ,
  idEntidade BIGINT   NOT NULL ,
  localidade VARCHAR(200)    ,
  perfilPic TEXT    ,
  backPic TEXT    ,
  sobre TEXT      ,
PRIMARY KEY(idPerfil, idEntidade)  ,
  FOREIGN KEY(idEntidade)
    REFERENCES Entidade(idEntidade)
      ON DELETE CASCADE
      ON UPDATE CASCADE);

CREATE INDEX FK_idEntidade ON Perfil (idEntidade);

CREATE INDEX IFK_perfil ON Perfil (idEntidade);

CREATE TABLE meios (
  idmeios SERIAL  NOT NULL ,
  idbanco INTEGER   NOT NULL ,
  idEntidade BIGINT   NOT NULL ,
  tipo VARCHAR(1)    ,
  endereco TEXT    ,
  agencia VARCHAR(4)    ,
  conta VARCHAR(10)    ,
  nome VARCHAR(200)      ,
PRIMARY KEY(idmeios, idbanco, idEntidade)    ,
  FOREIGN KEY(idbanco)
    REFERENCES bancos(idbanco)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  FOREIGN KEY(idEntidade)
    REFERENCES Entidade(idEntidade)
      ON DELETE CASCADE
      ON UPDATE CASCADE);

CREATE INDEX FK_Banco ON meios (idbanco);
CREATE INDEX FK_mEntidade ON meios (idEntidade);

CREATE INDEX IFK_relaciona ON meios (idbanco);
CREATE INDEX IFK_possui ON meios (idEntidade);

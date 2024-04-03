## Backend - Wefit

Aplicação desenvolvida para o teste de desenvolvedor backend da WeFit.

## Arquitetura

A aplicação foi desenvolvida seguindo o padrão de três camadas: controller, service e repository. Todos agrupados em módulos para diferenciar partes únicas e independentes do sistema. Neste caso, existe apenas um único módulo: `person`, responsável por cadastrar pessoas físicas ou jurídicas no banco de dados. Como a aplicação foi separada em camadas, pode-se utilizar da técnica de `inversão de dependência`, o que facilita bastante na hora de escrever testes unitários.

A aplicação utiliza as seguintes tecnologias:
- ExpressJS: Microframework utilizada para definir rotas HTTP.
- Kysely: Query builder utilizado para realizar ações no banco de dados. Foi escolhido um query builder ao invés de uma ORM como TypeORM devido a sua performance superior. E como o `kysely` é totalmente tipado, o torna uma solução segura e performática para realizar operações de acesso e escrita.
- Zod: Ferramente de validação. É utilizada para validar os dados enviados pelo usuário à API. Exemplo: validação de e-mail, cpf, cnpj etc. São definidos `DTOs` para controlar o que pode ou não passar pelo filtro inicial da aplicação.
- Mysql: Banco de dados utilizado pela aplicação.
- Swagger: Ferramente utilizada para documentar a API.
- Jest: Ferramenta utilizada para escrever e rodar testes unitários.
- Github Actions: Plataforma de CI/CD utilizada para montar as releases e fazer o deploy da aplicação para o ambiente de produção.

## Entrega

Foi entregue uma REST API completa, contendo todo o CRUD para pessoas, que podem ser tanto físicas quanto jurídicas.

### Configuração

Para rodar o projeto em sua máquina é necessário ter o `docker-compose` instalado. Com isso, base rodar `docker compose up` para iniciar o ambiente de desenvolvimento. Caso queira realizar alguma alteração no código, será necessário rodar o comando `yarn dev` em um novo terminal, dessa forma, os arquivos serão recompilados e a aplicação será atualizada.

## Deploy

Também foi desenvolvido um sistema básico de deploy, contendo duas `github actions`, uma responsável por montar a `release`, ou seja, adicionando `tags` e atualizando o CHANGELOG, e outra action responsável por montar a imagem `docker` e publicá-la no `docker-hub`.

Para esse desafio foi escolhida a plataforma de cloud `Digital Ocean` para realizar o deploy. O container roda dentro do ambiente `paas` da digital ocean, formalmente conhecido como `App Plataform`. Essa cloud foi a escolhida devido a sua simplicidade de configuração e rápida iteração de versões. O banco `mysql` também está rodando dentro da digital ocean.

### Link de produção
A aplicação pode ser acessada através do seguinte link: https://wefit-backend-challenge-mbwn5.ondigitalocean.app/

### Link da documentação do OpenAPI
A documentação das rotas pode ser acessada através do seguinte link: https://wefit-backend-challenge-mbwn5.ondigitalocean.app/docs

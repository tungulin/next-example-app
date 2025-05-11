![][image-banner]

<br />
<div align="center">
   <h2 align="center">Next example app (App Router)</h2>
</div>

### About The Project

The project is presented as an example of NextJs capabilities and its rendering methods:
1. SSR.
2. SSG. **(soon)**
3. CSR. **(soon)**

### Running frontend locally:

1. To work with the database, you need to specify env

2. Create .env file. Paste the required variables there -

```bash
DB_HOST= "your host"
DB_USER= "your user"
DB_PASS= "your password"
DB_NAME= "your db name"
```
3. Install all dependencies: 

```bash
yarn
```

4. Initialize the database and write test movie data into it: 

```bash
yarn db:init 
```

4. Run project: 

```bash
yarn dev
```

[image-banner]: ./images/image-banner.png

# Beer-Search
A responsive web application that allows you to search for beers and save the ones you like. Optionally, a user account can be created to permanently save beers. The beers are retrieved using the Punk API: https://punkapi.com/documentation/v2   

# Usage
* First, create the database and tables necessary for user accounts. Run the provided bash script "configure.sh" to do this. 
* Open a terminal window and go to the "backend" directory.
  * Set environment variables with the relevant database information
    * eg. $ PGUSER=dbuser \
          PGHOST=database.server.com \
          PGPASSWORD=secretpassword \
          PGDATABASE=mydb \
          PGPORT=3211
  * Now, run "npm index.js"
* Then, open another terminal window, navigate to the "frontend" directory and run "npm start"

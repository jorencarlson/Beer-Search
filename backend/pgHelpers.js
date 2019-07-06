const helpers = require('./helpers');
const { Pool } = require('pg')

const pool = new Pool()

this.deleteFavoritesFromDB = async(beersToDeleteFromDB, email) => {
    let IDConditions = helpers.createIDConditions(beersToDeleteFromDB);
    let query =  `delete from favorites f where f.email = '${email}' and ${IDConditions}`;
    try {
      let res = await pool.query(query);
      return true;
    } catch(error) {
      console.error(error);
      return false;
    }
  }
  
this.addFavoritesToDB = async(beerIDs, email) => {
    let rows = helpers.createRowsString(beerIDs, email);
    let query = 'insert into favorites values ' + rows;
    try {
      let res = await pool.query(query);
      return true;
    } catch(error) {
      console.error(error);
      return false;
    }
  }
  
this.findUser = async(email) => {
    let query = `select * from users u where u.email = '${email}'`;
    try {
        let res = await pool.query(query);
        if (res.rows.length === 0) {
            return false;
        }
        else {
            return res.rows[0];
        }
    } catch(error) {
        console.error(error.stack);
        return false;
    }
  }
  
this.beersInDB = async(email) => {
    let query = `select f.beerid from favorites f where f.email = '${email}'`;
    try {
        let res = await pool.query(query);
        if (res.rows.length === 0) {
            return [];
        }
        else {
            return res.rows;
        }
    } catch(error) {
        console.error(error.stack);
        return [];
    }
  }
  
this.signUp = async(user) => {
    let columns = helpers.createSignUpColumns(user);
    let columnValues = helpers.createSignUpColumnValues(user);
    let query = `insert into users (${columns}) values (${columnValues})`;
    try {
        let res = await pool.query(query);
        return true;
    } catch(error) {
        console.error(error.stack);
        return false;
    }
  }
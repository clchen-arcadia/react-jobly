import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  // static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  //   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  //   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static token = localStorage.getItem("token");

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      if(err.response.data?.error===undefined){
         err.response.data={error:{message:"Unable to connect to server"}}
        
      }
      console.log("updated", err.response)
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /**Get a list of all companies */
  static async getCompanies() {
    //console.log(this.token);
    let res = await this.request(`companies`);
    return res.companies;
  }

  // * Can filter on provided search filters API:
  // * - minEmployees
  // * - maxEmployees
  // * - nameLike (will find case-insensitive, partial matches)
  // *
  /**Filter a list of all companies......... */
  static async getFilteredCompanies(nameLike) {
    let res = await this.request('companies', { nameLike })
    console.log("filtered response = ", res);
    return res.companies;
  }

  /**Get a list of all jobs */
  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  // * Can provide search filter in query to API:
  // * - minSalary
  // * - hasEquity (true returns only jobs with equity > 0, other values ignored)
  // * - title (will find case-insensitive, partial matches)
  /**Filter a list of all jobs.............. */
  static async getFilteredJobs(title) {
    let res = await this.request('jobs', { title });
    return res.jobs
  }

  //  * Register
  //  * user must include { username, password, firstName, lastName, email }
  //  *
  //  * Returns JWT token which can be used to authenticate further requests.
  static async registerNewUser(newUserData) {
    let res = await this.request('auth/register', newUserData, 'POST');
    return res;
  }

  //  * Login  { username, password } => { token }
  //  *
  //  * Returns JWT token which can be used to authenticate further requests.
  static async loginUser(loginData) {
    let res = await this.request('auth/token', loginData, 'POST');
    return res;
  }

  //API call to get users information
  static async getUserInfo(username) {
    let res = await this.request(`users/${username}`);
    return res;
  }

  //API call to update a users information
  static async updateUserInfo(username, formData) {
    let res = await this.request(`users/${username}`, formData, 'PATCH');
    return res;
  }


}

export default JoblyApi;

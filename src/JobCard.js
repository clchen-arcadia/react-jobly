/**
 * Renders a card containing a job title and its details.
 *
 * State: none
 * Props: jobData as {title, salary, equity, companyHandle (optionally defined)}
 *
 *
 * JobCardList -> JobCard
 */

function JobCard({jobData}){
  return (
    <div className="JobCard">
      <h3>{jobData.title}</h3>
      {
        jobData.companyHandle !== undefined
        && <p>{jobData.companyHandle}</p>
      }
      <p>Salary: {jobData.salary}</p>
      <p>Equity {jobData.equity}</p>
    </div>
  )
}

export default JobCard;

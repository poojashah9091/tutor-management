import styles from "../../styles/tutorDetails.module.scss";
import { Paper } from "@mui/material";
import ProfessionalDetails from "@/components/tutorDetails/ProfessionalDetails";
import PersonalDetails from "@/components/tutorDetails/PersonalDetails";
import ManagerDetails from "@/components/tutorDetails/ManagerDetails";

const tutorDetails = ({tutorData}) =>{ 
    return(
        <main className={styles.tutor_details_container}>
            <article className={styles.tutor_details_section}>
                <Paper elevation={3} sx={{overflow: 'auto'}}>
                <PersonalDetails data={tutorData.personal} empId={tutorData.professional.empId}/>
                </Paper>
                <Paper elevation={3} sx={{overflow: 'auto'}}>
                    <ProfessionalDetails data={tutorData.professional} />
                
                </Paper>
            </article>
            <article className={styles.manager_details_section}>
                <Paper elevation={3} sx={{overflow: 'auto'}}>
                    <ManagerDetails data={tutorData.professional.managerDetails} />
                </Paper>
            </article>
        </main>
    )
}

export default tutorDetails;

export const getServerSideProps = async({params}) =>{
    const {tutorId} = params;
    const response = await fetch(`https://json-server-mock-api-tutors.vercel.app/tutors/${tutorId}`);
    const data = await response.json();

    return{
        props: {
            tutorData: data
        }
    }
}
import styles from "../styles/professionalDetails.module.scss";

const ProfessionalDetails = ({data}) =>{

    const formattedData = [
        {
            label: "Official Email",
            value: data?.email || '-'
        },
        {
            label: "Subjects",
            value: data?.subjects?.join(", ") || '-'
        },
        {
            label: "Training Status",
            value: data?.trainingStatus || '-'
        }
    ]


    return(
        <main className={styles.professional_details_container}>
            <p className={styles.section_header}>Additional Details</p>
            {
                formattedData.map(entry=>{
                    return(
                        <div className={styles.item_group} key={entry.label}>
                            <p className={styles.item_label}>{entry.label}</p>
                            <p className={styles.item_value}>{entry.value}</p>
                        </div>
                    )
                })
            }
        </main>
    )
}

export default ProfessionalDetails;
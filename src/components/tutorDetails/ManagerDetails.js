import styles from "../styles/managerDetails.module.scss";
import { Avatar } from "@mui/material";

const ManagerDetails = ({data}) =>{
    
    const formattedData = [
        {
            label: "Manager Email",
            value: data?.email || '-'
        },
        {
            label: "Manager Phone",
            value: data?.phone || '-',
        }
    ]
    return(
        <main className={styles.manager_details_container}>
            <p className={styles.section_header}>Manager Details</p>
            <section className={styles.basic_info}>
                <Avatar alt="avatarImage" src={data?.image} sx={{ width: 94, height: 94, border: '1px solid #d2d2d2' }}/>
                <div>
                    <h1>{data?.empId || '-'}</h1>
                    <h5>{data?.name || '-'}</h5>
                </div>
            </section>
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

export default ManagerDetails;
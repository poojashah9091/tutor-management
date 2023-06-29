import { Avatar } from "@mui/material";
import styles from "../styles/personalDetails.module.scss";
import colors from "../../utils/colors.module.scss";

const PersonalDetails = ({data, empId}) =>{

    const formattedData = [
        {
            label: "Personal Email",
            value: data?.email || '-'
        },
        {
            label: "Phone Number",
            value: data?.phone || '-'
        },
        {
            label: "Address",
            value: data?.address || '-'
        },
        {
            label: "City",
            value: data?.city || '-'
        },
        {
            label: "Postal Code",
            value: data?.postalCode || '-'
        },
        {
            label: "State",
            value: data?.state || '-'
        }
    ]

    return(
        <>
            <p className={styles.section_header}>Basic Details</p>
            <section className={styles.basic_info}>
                <Avatar alt="avatarImage" src={data?.image} sx={{ width: 94, height: 94, border: `1px solid ${colors.lightGray}` }}/>
                <div>
                    <h1>{empId}</h1>
                    <h5>{data?.firstName} {data?.lastName}</h5>
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
        </>
    )
}

export default PersonalDetails;
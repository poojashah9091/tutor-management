import { DataGrid } from '@mui/x-data-grid';
import { Avatar } from '@mui/material';
import { useRouter } from 'next/router';
import styles from '../../styles/tutorListing.module.scss';

const TutorListing = ({tutors}) =>{

  const router = useRouter();

  const columns = [
    {
      renderCell: (params) => {
        return <Avatar alt="avatarImage" src={params.row?.personal?.image} />
      },
      width: 70
    },
    {
      field: 'tutorName',
      valueGetter: (params) => {
        return `${params.row?.personal?.firstName || ''} ${params.row?.personal?.lastName || ''}`;
      },
      renderHeader: () => (
        <strong>
          {'Tutor Name'}
        </strong>
      ),
      width: 200,
      headerClassName: 'super-app-theme--header'
    },
    { 
      field: 'email', 
      valueGetter: (params) => {
        return `${params.row?.professional?.email || '-'}`;
      },
      renderHeader: () => (
        <strong>
          {'Email'}
        </strong>
      ),
      width: 250,
      headerClassName: 'super-app-theme--header' 
    },
    { 
      field: 'subjects', 
      valueGetter: (params) => {
        return `${params.row?.professional?.subjects.join(', ') || '-'}`;
      },
      renderHeader: () => (
        <strong>
          {'Subjects'}
        </strong>
      ),
      width: 220,
      headerClassName: 'super-app-theme--header' 
    },
    { 
      field: 'trainingStatus', 
      valueGetter: (params) => {
        return `${params.row?.professional?.trainingStatus || '-'}`;
      },
      renderHeader: () => (
        <strong>
          {'Training Status'}
        </strong>
      ),
      width: 150,
      headerClassName: 'super-app-theme--header' 
    },
    { 
      field: 'managerEmail', 
      valueGetter: (params) => {
        return `${params.row?.professional?.managerDetails?.email || '-'}`;
      },
      renderHeader: () => (
        <strong>
          {'Manager Email'}
        </strong>
      ),
      width: 250,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'location',
      valueGetter: (params) => {
        return `${params.row?.personal?.city || ''}, ${params.row?.personal?.state || ''}`;
      },
      renderHeader: () => (
        <strong>
          {'Location'}
        </strong>
      ),
      width: 150,
      headerClassName: 'super-app-theme--header'
    }
  ]

  const handleRowClick = (e) =>{
    router.push(`/tutor/${e.id}`);
  }

  return (
    <main className={styles.tutorList_container}>
      <DataGrid
        rows={tutors} 
        columns={columns}
        pageSize={10}
        onRowClick={handleRowClick}
        sx={{
          '& .super-app-theme--header': {
            color: '#ff5630'
          },
        }}
      />
    </main>
  )
}
export default TutorListing;

export const getServerSideProps = async() =>{
  const response = await fetch("http://localhost:4000/tutors");
  const data = await response.json();

  return{
    props:{
      tutors: data
    }
  }
}
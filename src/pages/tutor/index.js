import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Avatar } from '@mui/material';
import { useRouter } from 'next/router';
import styles from '../../styles/tutorListing.module.scss';

const TutorListing = ({tutors}) =>{

  const router = useRouter();

  const columns = [
    {
      field: ' ',
      renderCell: (params) => {
        return <Avatar alt="avatarImage" src={params.row?.personal?.image} />
      },
      width: 70,
      sortable: false,
      disableColumnMenu: true
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
      headerClassName: 'custom-header-theme'
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
      headerClassName: 'custom-header-theme' 
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
      headerClassName: 'custom-header-theme' 
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
      headerClassName: 'custom-header-theme' 
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
      headerClassName: 'custom-header-theme',
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
      headerClassName: 'custom-header-theme'
    }
  ]

  const handleRowClick = (e) =>{
    router.push(`/tutor/${e.id}`);
  }

  return (
    <main className={styles.tutorList_container}>
      <DataGrid
        rows={tutors} 
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={columns}
        pageSize={10}
        onRowClick={handleRowClick}
        slots={{ toolbar: GridToolbarQuickFilter }}
        pageSizeOptions={[5, 10, 25]}
        sx={{
          '& .custom-header-theme': {
            color: '#ff5630'
          },
        }}
      />
    </main>
  )
}
export default TutorListing;

export const getServerSideProps = async() =>{
  const response = await fetch("https://json-server-mock-api-tutors.vercel.app/tutors");
  const data = await response.json();

  return{
    props:{
      tutors: data
    }
  }
}
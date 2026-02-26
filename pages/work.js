export default function WorkRedirect() {
  return null;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/#work',
      permanent: false,
    },
  };
}

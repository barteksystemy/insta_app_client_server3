const Photo = ({ id, name }) => {
	const [url, setUrl] = useState(null);
	
	const getPhoto = async () => {
		const response = await fetch("http://localhost:4000/api/photos/image/" + id, {
      method: "GET",
      headers: { authorization: 'Bearer ' + localStorage.getItem("myToken"), }
    });
		// Zabezpieczenie, czy się udało
		if (response.ok) {
			const blob = await response.blob();
			setUrl(URL.createObjectUrl(blob));
		}
	};
	
	useEffect(() => {
		
		getPhoto();
		
	}, [])
	
	return (<div>
		<p>{name}</p>
		<img src={url} />
	</div>);
}

import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: 'https://welbi.org/api',
	headers: {
		'Authorization': 'Bearer e04553ff-795d-4e93-918a-3d92c10618ee', //maythuralwin487@gmail.com
	}
});


import axios from "axios";

export const api = ({endpoint, config }: {endpoint: string, config: Parameters<typeof axios>[1]}) => {
    return axios(`http://localhost:5024/${endpoint}`, config)
        
}
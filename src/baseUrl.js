
import { API_ADDRESS } from '../deploy_conf/config'

let protocol = window.location.protocol + '';
let baseUrl = '/api/';
if (protocol.substr(0, 4) == 'file') {
    baseUrl = API_ADDRESS + '/api/';
}
export default baseUrl

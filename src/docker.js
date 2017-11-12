const rp = require('request-promise');
const args = process.argv.slice(2);
const dockerUrl = args[0] ? args[0] : 'http://unix:/var/run/docker.sock:';
console.log(`Docker url is set: ${dockerUrl}`);

const headers = {
    'User-Agent': 'request',
    'Host': 'localhost'
};

const getServices = async() => {
    const servicesResult = await rp({uri: `${dockerUrl}/services`, headers});
    const tasksResult = await rp({uri: `${dockerUrl}/tasks`, headers});
    const tasks = JSON.parse(tasksResult);
    const tasksByService = {};
    tasks.forEach(task => {
        if(!tasksByService[task.ServiceID]) {
          tasksByService[task.ServiceID] = 0;
        }
        if(task.Status.State === 'running'){
          tasksByService[task.ServiceID] += 1;
        }
    });
    return JSON.parse(servicesResult)
        .map(service => ({
            ...service,
            runningTasks: tasksByService[service.ID]
        }));
} 

const getService = async(serviceName) => {
    const serviceResult = await rp({uri: `${dockerUrl}/services/${serviceName}`, headers});
    return JSON.parse(serviceResult);
} 

const getNodes = async() => {
    const nodesResult = await rp({uri: `${dockerUrl}/nodes`, headers});
    return JSON.parse(nodesResult);
} 

module.exports = {
    getServices:getServices,
    getService:getService,
    getNodes:getNodes
}
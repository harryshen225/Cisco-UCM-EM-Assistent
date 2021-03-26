export function deviceQuery() {
    var data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://www.cisco.com/AXL/API/12.5">\n   <soapenv:Header/>\n   <soapenv:Body>\n      <ns:executeSQLQuery>\n      <sql>\n        select d.name, d.description, n.dnorpattern as DN from device as d,\nnumplan as n, devicenumplanmap as dnpm where dnpm.fkdevice = d.pkid and\ndnpm.fknumplan = n.pkid and d.tkclass = 1 and n.dnorpattern=\'121215\'\n</sql>\n      </ns:executeSQLQuery>\n   </soapenv:Body>\n</soapenv:Envelope>';

    var config = {
        method: 'post',
        url: 'https://198.18.133.3:8443/axl/',
        headers: {
            'SOAPAction': 'CUCM:DB ver=12.5 executeSQLQuery',
            'Content-Type': 'application/javascript',
            'Authorization': 'Basic YWRtaW5pc3RyYXRvcjpkQ2xvdWQxMjMh',
            'Cookie': 'JSESSIONID=CDC79CBD13827540DA32240477A11599; JSESSIONIDSSO=CE65958B18D72ABF40360E5B36B4183F'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}
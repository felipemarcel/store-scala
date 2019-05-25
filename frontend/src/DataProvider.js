import {stringify} from 'query-string';
import {CREATE, fetchUtils, GET_LIST, GET_MANY, GET_MANY_REFERENCE, GET_ONE, UPDATE} from 'react-admin';


/**
 * Maps react-admin queries to a simple REST API
 *
 * The REST dialect is similar to the one of FakeRest
 * @see https://github.com/marmelab/FakeRest
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?filter={ids:[123,456,789]}
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertDataRequestToHTTP = (type, resource, params) => {
        let url = '';
        const options = {};
        if (!options.headers) {
            options.headers = new Headers({Accept: 'application/json'});

        }
        switch (type) {
            case GET_LIST: {
                const offset = params.pagination.page;
                const limit = params.pagination.perPage;
                const orderBy = params.sort.field;
                const order = params.sort.order;
                const query = {
                    orderBy: orderBy,
                    order: order,
                    offset: (offset - 1) * limit,
                    limit: limit,
                    ...{filter: JSON.stringify(params.filter)}
                };
                url = `${apiUrl}/${resource}`;
                break;
            }
            case GET_ONE:
                url = `${apiUrl}/${resource}/${params.id}`;
                break;
            case GET_MANY: {
                const query = {
                    filter: JSON.stringify({id: params.ids})
                };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }
            case GET_MANY_REFERENCE: {
                const offset = params.pagination.page;
                const limit = params.pagination.perPage;
                const orderBy = params.sort.field;
                const order = params.sort.order;
                const query = {
                    orderBy: orderBy,
                    order: order,
                    offset: (offset - 1) * limit,
                    limit: limit
                };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }
            case UPDATE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'PUT';
                options.body = JSON.stringify(params.data);
                break;
            case CREATE:
                url = `${apiUrl}/${resource}`;
                options.method = 'POST';
                options.body = JSON.stringify(params.data);
                break;
            default:
                throw new Error(`ImpossÃ­vel continuar com esta aÃ§Ã£o.`);
        }
        return {url, options};
    };


    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} Data response
     */
    const convertHTTPResponse = (response, type, resource, params) => {
        const {headers, json} = response;
        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                return {
                    data: json.map(function (r) {
                        r.id = r._id.$oid;
                        return r;
                    }),
                    total: json.length
                };
            case UPDATE:
            case CREATE:
                return {data: {...params.data, id: headers.get('location')}};
            default:
                return {data: {...json, id: params.id}};
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a data response
     */
    return (type, resource, params) => {
        const {url, options} = convertDataRequestToHTTP(
            type,
            resource,
            params
        );
        debugger;
        return httpClient(url, options).then(response =>
            convertHTTPResponse(response, type, resource, params)
        ).catch(err => {
            throw new Error(err.body.errors)
        });
    };

}
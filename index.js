"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (schema) => {
    let GraphqlType;
    (function (GraphqlType) {
        GraphqlType["type"] = "type";
        GraphqlType["interface"] = "interface";
    })(GraphqlType || (GraphqlType = {}));
    const getTypeName = (type, item) => ((item.search('implements') !== -1)
        ? item.split('implements')[0].replace('type', '').trim()
        : item.replace(type, '').replace('{', '').trim());
    const getGraphTypeMap = (type) => (new Map(schema.match(new RegExp(`${type}(.*){`, "g")).map(item => [
        getTypeName(type, item),
        schema.match(new RegExp(`${item}([^}]+)\}`, "g")).map(v => v.replace('}', '').trim().replace(item, '')).join('')
    ])));
    const interfaces = getGraphTypeMap(GraphqlType.interface);
    const types = getGraphTypeMap(GraphqlType.type);
    schema.match(new RegExp(`type(.*){`, "g")).map(item => {
        if (item.search('implements') !== -1) {
            const split = item.split('implements');
            const typeName = split[0].replace('type', '').trim();
            const names = split[1].replace('implements', '').replace('{', '').split('&').reverse().map((name) => {
                name = name.trim();
                const interfaceValue = interfaces.get(name);
                schema = schema.replace(item, `${item}${interfaceValue}`);
            });
        }
    });
    schema.match(/(\.{3})(.*)\n/g).map((item) => {
        const name = item.replace('...', '').trim();
        if (interfaces.get(name)) {
            schema = schema.replace(item.trim(), `${interfaces.get(name).trim()}`);
        }
        if (types.get(name)) {
            schema = schema.replace(item.trim(), `${types.get(name).trim()}`);
        }
    });
    return schema;
};

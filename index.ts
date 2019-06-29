export default (schema: string) => {
    enum GraphqlType {
        type = 'type',
        interface = 'interface',
    }

    const getTypeName = (type: GraphqlType, item: string): string => (
        (item.search('implements') !== -1)
            ? item.split('implements')[0].replace('type', '').trim() 
            : item.replace(type, '').replace('{', '').trim()
    )

    const getGraphTypeMap = (type: GraphqlType): Map<string, string> => (
        new Map<string, string>(schema.match(new RegExp(`${type}(.*){`, "g")).map(item => [
            getTypeName(type, item),
            schema.match(new RegExp(`${item}([^}]+)\}`, "g")).map(v => 
                v.replace('}', '').trim().replace(item, '')
            ).join('')
        ]) as any)
    )

    const interfaces = getGraphTypeMap(GraphqlType.interface)
    const types = getGraphTypeMap(GraphqlType.type)

    schema.match(new RegExp(`type(.*){`, "g")).map(item => {
        if (item.search('implements') !== -1) {
            const split = item.split('implements')
            const typeName = split[0].replace('type', '').trim()
            const names = split[1].replace('implements', '').replace('{', '').split('&').reverse().map((name) => {
                name = name.trim()
                const interfaceValue = interfaces.get(name)
                schema = schema.replace(item, `${item}${interfaceValue}`)
            })
        }
    })

    schema.match(/(\.{3})(.*)\n/g).map((item) => {
        const name = item.replace('...', '').trim()
        if (interfaces.get(name)) {
            schema = schema.replace(item.trim(), `${interfaces.get(name).trim()}`)
        }
        if (types.get(name)) {
            schema = schema.replace(item.trim(), `${types.get(name).trim()}`)
        }
    })

    return schema
}
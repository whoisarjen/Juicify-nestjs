export const loadMissingData = ({ id, userid, object = {} }: { id: string, userid: string, object: any }) => {
    return {
        ...(object.id ? { id: object.id } : { id }),
        ...(object.userid ? { userid: object.userid } : { userid }),
        ...(object.title ? { title: object.title } : { title: '' }),
        ...(object.description ? { description: object.description } : { description: '' }),
        ...(object.burnt ? { burnt: object.burnt } : { burnt: 0 }),
        ...(object.exercises ? { exercises: object.exercises } : { exercises: [] }),
    }
}
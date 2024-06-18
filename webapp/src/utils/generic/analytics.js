import "server-only"
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/generic/next-auth";
import Mixpanel from 'mixpanel';

// SERVER SIDE TRACKING METHODS
const track = async (event, properties) => {
    var mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN);

    const session = await getServerSession(authOptions);

    if (session) {
        properties = {
            ...properties,
            distinct_id: session.user.id // required name by mixpanel
        }        
    }

    mixpanel.track(event, properties)
}

const identify = async (properties) => {
    var mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN);
    
    const session = await getServerSession(authOptions);
    
    const userId = session.user.id
    
    const mp_special_properties = ["email", "phone"]
    for (const prop in mp_special_properties) {
        if (prop in properties) {
            properties["$"+prop] = properties[prop]
            delete properties[prop]
        }
    }
    
    properties = {
        ...properties,
        ...session.user
    }
    
    console.log("Identifying user with properties:")
    console.log(properties)
    // auth_properties = {"family_name": "$first_name", "given_name": "$last_name"}
    // for prop in auth_properties:
    //     if prop in properties:
    //         properties[auth_properties[prop]] = properties[prop]
    //         del properties[prop]

    mixpanel.people.set(userId, properties)
}

export { track, identify }
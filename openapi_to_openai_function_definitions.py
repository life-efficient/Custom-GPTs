import jsonref
import json
import yaml
from pprint import pprint

def get_openapi_spec():
    openapi_spec_path = "../../../api/me_optimize_api_v2.yaml"
    with open(openapi_spec_path) as f:
        return yaml.safe_load(f)
    
def filter_only_user_facing_endpoints(openapi_spec):
    # save original spec for debugging
    # with open("original_openapi_spec.json", "w") as f:
    #     json.dump(openapi_spec, f, indent=4)

    user_facing_endpoints = [
        {
            "path": "/programs",
            "methods": ["GET"]
        },
        # TODO ask team which other endpoints are user facing
    ]
    filtered_spec = {}
    # create a version of the spec that only includes user facing endpoints
    pprint(openapi_spec.keys())
    # create a version of the spec that we will add user_facing endpoints to
    filtered_spec = {
        **openapi_spec,
        "paths": {},
        # "components": {}
    }
    for path, methods in openapi_spec["paths"].items():
        for method, spec in methods.items():
            endpoints = [endpoint for endpoint in user_facing_endpoints if endpoint["path"] == path]
            for endpoint in endpoints:
                methods = endpoint["methods"]
                if method.upper() in methods:
                    # add the path to the filtered spec
                    if path not in filtered_spec["paths"]:
                        filtered_spec["paths"][path] = {}
                    # add the method to the path
                    filtered_spec["paths"][path][method] = spec

    return filtered_spec

def openapi_to_functions(openapi_spec):
    # Use jsonref to resolve references within the spec
    openapi_spec_resolved = jsonref.JsonRef.replace_refs(openapi_spec)

    functions = []

    # pprint(openapi_spec.keys())


    for path, methods in openapi_spec_resolved["paths"].items():
        for method, spec_with_ref in methods.items():
            # Ensure that spec_with_ref is a dictionary before proceeding.
            if not isinstance(spec_with_ref, dict):
                continue  # Skip this iteration if it's not a dictionary.

            # References are already resolved by jsonref
            spec = spec_with_ref

            # Extract a name for the functions.
            function_name = spec.get("operationId")
            if not function_name:
                continue  # Skip if operationId is not present or is None.

            # Extract a description and parameters.
            desc = spec.get("description") or spec.get("summary", "")

            schema = {"type": "object", "properties": {}}

            req_body = spec.get("requestBody", {}).get("content", {}).get("application/json", {}).get("schema")
            if req_body:
                schema["properties"]["requestBody"] = req_body

            params = spec.get("parameters", [])
            if params:
                param_properties = {param["name"]: param.get("schema", {}) for param in params}
                schema["properties"]["parameters"] = {"type": "object", "properties": param_properties}

            functions.append({"type": "function", "function": {"name": function_name, "description": desc, "parameters": schema}})

    return functions


if __name__ == "__main__":
    openapi_spec = get_openapi_spec()
    openapi_spec = filter_only_user_facing_endpoints(openapi_spec)

    # save filtered spec for debugging
    # with open("filtered_openapi_spec.json", "w") as f:
    #     json.dump(openapi_spec, f, indent=4)

    # pp(openapi_spec)
    functions = openapi_to_functions(openapi_spec)

    # for function in functions:
    #     pprint(function)
    #     print()

    # save the functions to a file
    with open("backend_tools.json", "w") as f:
        json.dump(functions, f, indent=4)

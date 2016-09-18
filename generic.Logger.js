"use strict";

/**
 * @class GenericLogger
 */
class GenericLogger {


    /** Generic logging*/

    static endpointTriggeredLog (endpoint) {
        if(!global.loggerSettings.loggingOn){return;}
        if(!global.loggerSettings.generic.genericLoggingOn){return;}

        if (global.loggerSettings.generic.endpointLoggingOn) {
            console.log("[Controller][Endpoint]: " + endpoint);
        }
    }

    static granularMethodTriggeredLog (granularMethod) {
        if(!global.loggerSettings.loggingOn){return;}
        if(!global.loggerSettings.generic.genericLoggingOn){return;}

        if (global.loggerSettings.generic.granularLoggingOn) {
            console.log("[Granular]: " + granularMethod);
        }
    }

    static databaseStatementLog (databaseStatement) {
        if(!global.loggerSettings.loggingOn){return;}
        if(!global.loggerSettings.generic.genericLoggingOn){return;}

        if (global.loggerSettings.generic.databaseStatementLoggingOn) {
            console.log("[DBS]: " + databaseStatement);
        }
    }


    /** Component type - method triggered logging **/

    static controllerMethodTriggeredLog (controllerMethod) {
        if(!global.loggerSettings.loggingOn){return;}
        if(!global.loggerSettings.components.componentsLoggingOn){return;}

        if (global.loggerSettings.components.controllerMethodTriggeredLogginOn) {
            console.log("[Controller]: " + controllerMethod);
        }
    }

    static serviceMethodTriggeredLog (serviceMethod) {
        if(!global.loggerSettings.loggingOn){return;}
        if(!global.loggerSettings.components.componentsLoggingOn){return;}

        if (global.loggerSettings.components.serviceMethodTriggeredLogginOn) {
            console.log("[Service]: " + serviceMethod);
        }
    }

    static modelMethodTriggeredLog (modelMethod) {
        if(!global.loggerSettings.loggingOn){return;}
        if(!global.loggerSettings.components.componentsLoggingOn){return;}

        if (global.loggerSettings.components.modelMethodTriggeredLogginOn) {
            console.log("[Model]: " + modelMethod);
        }
    }

    static viewModelMapperMethodTriggeredLog (viewModelMethod) {
        if(!global.loggerSettings.loggingOn){return;}
        if(!global.loggerSettings.components.componentsLoggingOn){return;}

        if (global.loggerSettings.components.viewModelMapperMethodTriggeredLogginOn) {
            console.log("[View.Model]: " + viewModelMethod);
        }
    }

    /**
     * To be removed eventually when are no calls to it
     * @param entityMapperMethod
     */
    static entityMapperMethodTriggeredLog (entityMapperMethod) {
        if(!global.loggerSettings.loggingOn){return;}
        if(!global.loggerSettings.components.componentsLoggingOn){return;}

        if (global.loggerSettings.components.entityMapperMethodTriggeredLogginOn) {
            console.log("[Model]: " + entityMapperMethod);
        }
    }


    static entityModelMapperMethodTriggeredLog (entityModelMapperMethod) {
        if(!global.loggerSettings.loggingOn){return;}
        if(!global.loggerSettings.components.componentsLoggingOn){return;}

        if (global.loggerSettings.components.entityModelMapperMethodTriggeredLogginOn) {
            console.log("[Entity.Model]: " + entityModelMapperMethod);
        }
    }

    static repositoryMethodTriggeredLog (repositoryMethod) {
        if(!global.loggerSettings.loggingOn){return;}
        if(!global.loggerSettings.components.componentsLoggingOn){return;}

        if (global.loggerSettings.components.repositoryMethodTriggeredLogginOn) {
            console.log("[Repository]: " + repositoryMethod);
        }
    }

    static validatorMethodTriggeredLog (validatorMethod) {
        if(!global.loggerSettings.loggingOn){return;}
        if(!global.loggerSettings.components.componentsLoggingOn){return;}

        if (global.loggerSettings.components.validatorMethodTriggeredLogginOn) {
            console.log("[Validator]: " + validatorMethod);
        }
    }

    static helperMethodTriggeredLog (helperMethod) {
        if(!global.loggerSettings.loggingOn){return;}
        if(!global.loggerSettings.components.componentsLoggingOn){return;}

        if (global.loggerSettings.components.helperMethodTriggeredLogginOn) {
            console.log("[Helper]: " + helperMethod);
        }
    }

    /** Promises related logging **/


    static errorPromiseObjectLog (errorPromiseObject) {
        if(!global.loggerSettings.loggingOn){return;}
        if(!global.loggerSettings.promises.promisesLoggingOn){return;}

        if (global.loggerSettings.promises.errorPromiseObjectLoggingOn) {
            console.log(errorPromiseObject);
        }
    }

    static resolvePromiseObjectLog (resolvePromiseObject) {
        if(!global.loggerSettings.loggingOn){return;}
        if(!global.loggerSettings.promises.promisesLoggingOn){return;}

        if (global.loggerSettings.promises.resolvePromiseObjectLoggingOn) {
            console.log(resolvePromiseObject);
        }
    }

    /** Flow related logging **/

    static responseObjectLog (responseObject) {
        if(!global.loggerSettings.loggingOn){return;}
        if(!global.loggerSettings.flow.flowLoggingOn){return;}

        if (global.loggerSettings.flow.responseObjectLoggingOn) {
            console.log(responseObject);
        }
    }
}

module.exports = GenericLogger;
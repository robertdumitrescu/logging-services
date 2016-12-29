"use strict";

/**
 * @class GenericLogger
 */
class GenericLogger {


    /** Generic logging*/

    static endpointTriggeredLog (endpoint) {
        if(!global.config.loggerSettings.loggingOn){return;}
        if(!global.config.loggerSettings.generic.genericLoggingOn){return;}

        if (global.config.loggerSettings.generic.endpointLoggingOn) {
            console.log("[Controller][Endpoint]: " + endpoint);
        }
    }

    static granularMethodTriggeredLog (granularMethod) {
        if(!global.config.loggerSettings.loggingOn){return;}
        if(!global.config.loggerSettings.generic.genericLoggingOn){return;}

        if (global.config.loggerSettings.generic.granularLoggingOn) {
            console.log("[Granular]: " + granularMethod);
        }
    }

    static databaseStatementLog (databaseStatement) {
        if(!global.config.loggerSettings.loggingOn){return;}
        if(!global.config.loggerSettings.generic.genericLoggingOn){return;}

        if (global.config.loggerSettings.generic.databaseStatementLoggingOn) {
            console.log("[DBS]: " + databaseStatement);
        }
    }


    /** Component type - method triggered logging **/

    static controllerMethodTriggeredLog (controllerMethod) {
        if(!global.config.loggerSettings.loggingOn){return;}
        if(!global.config.loggerSettings.components.componentsLoggingOn){return;}

        if (global.config.loggerSettings.components.controllerMethodTriggeredLogginOn) {
            console.log("[Controller]: " + controllerMethod);
        }
    }

    static serviceMethodTriggeredLog (serviceMethod) {
        if(!global.config.loggerSettings.loggingOn){return;}
        if(!global.config.loggerSettings.components.componentsLoggingOn){return;}

        if (global.config.loggerSettings.components.serviceMethodTriggeredLogginOn) {
            console.log("[Service]: " + serviceMethod);
        }
    }

    static modelMethodTriggeredLog (modelMethod) {
        if(!global.config.loggerSettings.loggingOn){return;}
        if(!global.config.loggerSettings.components.componentsLoggingOn){return;}

        if (global.config.loggerSettings.components.modelMethodTriggeredLogginOn) {
            console.log("[Model]: " + modelMethod);
        }
    }

    static viewModelMapperMethodTriggeredLog (viewModelMethod) {
        if(!global.config.loggerSettings.loggingOn){return;}
        if(!global.config.loggerSettings.components.componentsLoggingOn){return;}

        if (global.config.loggerSettings.components.viewModelMapperMethodTriggeredLogginOn) {
            console.log("[View.Model]: " + viewModelMethod);
        }
    }

    /**
     * To be removed eventually when are no calls to it
     * @param entityMapperMethod
     */
    static entityMapperMethodTriggeredLog (entityMapperMethod) {
        if(!global.config.loggerSettings.loggingOn){return;}
        if(!global.config.loggerSettings.components.componentsLoggingOn){return;}

        if (global.config.loggerSettings.components.entityMapperMethodTriggeredLogginOn) {
            console.log("[Model]: " + entityMapperMethod);
        }
    }


    static entityModelMapperMethodTriggeredLog (entityModelMapperMethod) {
        if(!global.config.loggerSettings.loggingOn){return;}
        if(!global.config.loggerSettings.components.componentsLoggingOn){return;}

        if (global.config.loggerSettings.components.entityModelMapperMethodTriggeredLogginOn) {
            console.log("[Entity.Model]: " + entityModelMapperMethod);
        }
    }

    static repositoryMethodTriggeredLog (repositoryMethod) {
        if(!global.config.loggerSettings.loggingOn){return;}
        if(!global.config.loggerSettings.components.componentsLoggingOn){return;}

        if (global.config.loggerSettings.components.repositoryMethodTriggeredLogginOn) {
            console.log("[Repository]: " + repositoryMethod);
        }
    }

    static validatorMethodTriggeredLog (validatorMethod) {
        if(!global.config.loggerSettings.loggingOn){return;}
        if(!global.config.loggerSettings.components.componentsLoggingOn){return;}

        if (global.config.loggerSettings.components.validatorMethodTriggeredLogginOn) {
            console.log("[Validator]: " + validatorMethod);
        }
    }

    static helperMethodTriggeredLog (helperMethod) {
        if(!global.config.loggerSettings.loggingOn){return;}
        if(!global.config.loggerSettings.components.componentsLoggingOn){return;}

        if (global.config.loggerSettings.components.helperMethodTriggeredLogginOn) {
            console.log("[Helper]: " + helperMethod);
        }
    }

    /** Promises related logging **/


    static errorPromiseObjectLog (errorPromiseObject) {
        if(!global.config.loggerSettings.loggingOn){return;}
        if(!global.config.loggerSettings.promises.promisesLoggingOn){return;}

        if (global.config.loggerSettings.promises.errorPromiseObjectLoggingOn) {
            console.log(errorPromiseObject);
        }
    }

    static resolvePromiseObjectLog (resolvePromiseObject) {
        if(!global.config.loggerSettings.loggingOn){return;}
        if(!global.config.loggerSettings.promises.promisesLoggingOn){return;}

        if (global.config.loggerSettings.promises.resolvePromiseObjectLoggingOn) {
            console.log(resolvePromiseObject);
        }
    }

    /** Flow related logging **/

    static responseObjectLog (responseObject) {
        if(!global.config.loggerSettings.loggingOn){return;}
        if(!global.config.loggerSettings.flow.flowLoggingOn){return;}

        if (global.config.loggerSettings.flow.responseObjectLoggingOn) {
            console.log(responseObject);
        }
    }
}

module.exports = GenericLogger;
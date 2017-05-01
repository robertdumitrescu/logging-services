"use strict";

/**
 * @class GenericLogger
 */
class GenericLogger {


    /** Generic logging*/

    static endpointTriggeredLog (endpoint) {
        if(typeof global.config.logger == "undefined"){return;}

        if(!global.config.logger.loggingOn){return;}
        if(!global.config.logger.generic.genericLoggingOn){return;}

        if (global.config.logger.generic.endpointLoggingOn) {
            console.log("[Controller][Endpoint]: " + endpoint);
        }
    }

    static granularMethodTriggeredLog (granularMethod) {
        if(typeof global.config.logger == "undefined"){return;}

        if(!global.config.logger.loggingOn){return;}
        if(!global.config.logger.generic.genericLoggingOn){return;}

        if (global.config.logger.generic.granularLoggingOn) {
            console.log("[Granular]: " + granularMethod);
        }
    }

    static databaseStatementLog (databaseStatement) {
        if(typeof global.config.logger == "undefined"){return;}

        if(!global.config.logger.loggingOn){return;}
        if(!global.config.logger.generic.genericLoggingOn){return;}

        if (global.config.logger.generic.databaseStatementLoggingOn) {
            console.log("[DBS]: " + databaseStatement);
        }
    }


    /** Component type - method triggered logging **/

    static controllerMethodTriggeredLog (controllerMethod) {
        if(typeof global.config.logger == "undefined"){return;}

        if(!global.config.logger.loggingOn){return;}
        if(!global.config.logger.components.componentsLoggingOn){return;}

        if (global.config.logger.components.controllerMethodTriggeredLogginOn) {
            console.log("[Controller]: " + controllerMethod);
        }
    }

    static serviceMethodTriggeredLog (serviceMethod) {
        if(typeof global.config.logger == "undefined"){return;}

        if(!global.config.logger.loggingOn){return;}
        if(!global.config.logger.components.componentsLoggingOn){return;}

        if (global.config.logger.components.serviceMethodTriggeredLogginOn) {
            console.log("[Service]: " + serviceMethod);
        }
    }

    static modelMethodTriggeredLog (modelMethod) {
        if(typeof global.config.logger == "undefined"){return;}

        if(!global.config.logger.loggingOn){return;}
        if(!global.config.logger.components.componentsLoggingOn){return;}

        if (global.config.logger.components.modelMethodTriggeredLogginOn) {
            console.log("[Model]: " + modelMethod);
        }
    }

    static viewModelMapperMethodTriggeredLog (viewModelMethod) {
        if(!global.config.logger.loggingOn){return;}
        if(!global.config.logger.components.componentsLoggingOn){return;}

        if (global.config.logger.components.viewModelMapperMethodTriggeredLogginOn) {
            console.log("[View.Model]: " + viewModelMethod);
        }
    }

    /**
     * To be removed eventually when are no calls to it
     * @param entityMapperMethod
     */
    static entityMapperMethodTriggeredLog (entityMapperMethod) {
        if(typeof global.config.logger == "undefined"){return;}

        if(!global.config.logger.loggingOn){return;}
        if(!global.config.logger.components.componentsLoggingOn){return;}

        if (global.config.logger.components.entityMapperMethodTriggeredLogginOn) {
            console.log("[Model]: " + entityMapperMethod);
        }
    }


    static entityModelMapperMethodTriggeredLog (entityModelMapperMethod) {
        if(typeof global.config.logger == "undefined"){return;}

        if(!global.config.logger.loggingOn){return;}
        if(!global.config.logger.components.componentsLoggingOn){return;}

        if (global.config.logger.components.entityModelMapperMethodTriggeredLogginOn) {
            console.log("[Entity.Model]: " + entityModelMapperMethod);
        }
    }

    static repositoryMethodTriggeredLog (repositoryMethod) {
        if(typeof global.config.logger == "undefined"){return;}

        if(!global.config.logger.loggingOn){return;}
        if(!global.config.logger.components.componentsLoggingOn){return;}

        if (global.config.logger.components.repositoryMethodTriggeredLogginOn) {
            console.log("[Repository]: " + repositoryMethod);
        }
    }

    static validatorMethodTriggeredLog (validatorMethod) {
        if(typeof global.config.logger == "undefined"){return;}

        if(!global.config.logger.loggingOn){return;}
        if(!global.config.logger.components.componentsLoggingOn){return;}

        if (global.config.logger.components.validatorMethodTriggeredLogginOn) {
            console.log("[Validator]: " + validatorMethod);
        }
    }

    static helperMethodTriggeredLog (helperMethod) {
        if(typeof global.config.logger == "undefined"){return;}

        if(!global.config.logger.loggingOn){return;}
        if(!global.config.logger.components.componentsLoggingOn){return;}

        if (global.config.logger.components.helperMethodTriggeredLogginOn) {
            console.log("[Helper]: " + helperMethod);
        }
    }

    /** Promises related logging **/


    static errorPromiseObjectLog (errorPromiseObject) {
        if(typeof global.config.logger == "undefined"){return;}

        if(!global.config.logger.loggingOn){return;}
        if(!global.config.logger.promises.promisesLoggingOn){return;}

        if (global.config.logger.promises.errorPromiseObjectLoggingOn) {
            console.log(errorPromiseObject);
        }
    }

    static resolvePromiseObjectLog (resolvePromiseObject) {
        if(typeof global.config.logger == "undefined"){return;}

        if(!global.config.logger.loggingOn){return;}
        if(!global.config.logger.promises.promisesLoggingOn){return;}

        if (global.config.logger.promises.resolvePromiseObjectLoggingOn) {
            console.log(resolvePromiseObject);
        }
    }

    /** Flow related logging **/

    static responseObjectLog (responseObject) {
        if(typeof global.config.logger == "undefined"){return;}

        if(!global.config.logger.loggingOn){return;}
        if(!global.config.logger.flow.flowLoggingOn){return;}

        if (global.config.logger.flow.responseObjectLoggingOn) {
            console.log(responseObject);
        }
    }
}

module.exports = GenericLogger;
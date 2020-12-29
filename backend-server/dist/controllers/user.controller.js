"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCredits = exports.updatePassword = exports.updateInfo = exports.updateProfilePhoto = exports.register = exports.login = void 0;
var oracle_1 = require("../oracle");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, pass, query, result, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.body.email;
                    pass = req.body.password;
                    query = "SELECT * FROM USUARIO WHERE correo_electronico = '" + email + "' AND contrasena = '" + pass + "'";
                    return [4 /*yield*/, oracle_1.connection.execute(query)];
                case 1:
                    result = _a.sent();
                    try {
                        if (result.rows) {
                            response = {
                                email: result.rows[0][0],
                                firstName: result.rows[0][2],
                                lastName: result.rows[0][3],
                                birthDate: result.rows[0][4],
                                country: result.rows[0][5],
                                imgFile: result.rows[0][6],
                                type: result.rows[0][7],
                                credits: result.rows[0][8]
                            };
                            res.json(response);
                        }
                    }
                    catch (err) {
                        res.send(null);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, pass, firstName, lastName, birthDate, country, query, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.body.email;
                    pass = req.body.password;
                    firstName = req.body.firstName;
                    lastName = req.body.lastName;
                    birthDate = req.body.birthDate;
                    country = req.body.country;
                    query = "INSERT INTO USUARIO(correo_electronico,contrasena,nombre,apellido,fecha_nac,pais,tipo,creditos) VALUES('" + email + "','" + pass + "','" + firstName + "','" + lastName + "',DATE '" + birthDate + "','" + country + "',2,10000)";
                    console.log(query);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, oracle_1.connection.execute(query, [], { autoCommit: true })];
                case 2:
                    result = _a.sent();
                    if (result.rowsAffected) {
                        res.send(result);
                    }
                    else {
                        res.status(400).send('Bad Request');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    res.status(400).send("Ese usuario ya existe");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.register = register;
function updateProfilePhoto(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, path, query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.body.email;
                    path = req.body.path;
                    query = "UPDATE USUARIO SET foto_perfil = '" + path + "' WHERE correo_electronico='" + email + "'";
                    console.log(query);
                    return [4 /*yield*/, oracle_1.connection.execute(query, [], { autoCommit: true })];
                case 1:
                    result = _a.sent();
                    if (result.rowsAffected) {
                        res.send(result);
                    }
                    else {
                        res.status(400).send('Bad Request');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateProfilePhoto = updateProfilePhoto;
function updateInfo(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, firstName, lastName, birthDate, country, query, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.body.email;
                    firstName = req.body.firstName;
                    lastName = req.body.lastName;
                    birthDate = req.body.birthDate;
                    country = req.body.country;
                    query = "UPDATE USUARIO SET nombre = '" + firstName + "', apellido = '" + lastName + "', pais = '" + country + "', fecha_nac = TO_DATE('" + birthDate + "', 'MONTH DD, YYYY') WHERE correo_electronico = '" + email + "'";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, oracle_1.connection.execute(query, [], { autoCommit: true })];
                case 2:
                    result = _a.sent();
                    if (result.rowsAffected) {
                        res.send({ data: "Datos actualizados" });
                    }
                    else {
                        res.send({ data: "No se hicieron cambios" });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    res.statusCode = 500;
                    res.statusMessage = error_2;
                    res.send();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateInfo = updateInfo;
function updatePassword(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, password, query, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.body.email;
                    password = req.body.password;
                    query = "UPDATE USUARIO SET contrasena = '" + password + "' WHERE correo_electronico = '" + email + "'";
                    console.log(query);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, oracle_1.connection.execute(query, [], { autoCommit: true })];
                case 2:
                    result = _a.sent();
                    if (result.rowsAffected) {
                        res.send({ data: "Datos actualizados" });
                    }
                    else {
                        res.send({ data: "No se hicieron cambios" });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    res.statusCode = 500;
                    res.statusMessage = error_3;
                    res.send();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updatePassword = updatePassword;
function updateCredits(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var binds, query, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    binds = req.body.array;
                    query = "BEGIN\n            actualiza_creditos(:email,:creditsToModify);\n        END;";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, oracle_1.connection.executeMany(query, binds, { autoCommit: true })];
                case 2:
                    result = _a.sent();
                    if (result.rowsAffected) {
                        res.json({ message: "Actualizados correctamente" });
                    }
                    else {
                        res.json({ message: "No se actualizó" });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error(err_1);
                    res.status(500).json(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateCredits = updateCredits;

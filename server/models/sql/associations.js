import User from "./User.js";
import Event from "./Event.js";
import Registration from "./Registration.js";

User.hasMany(Registration, { foreignKey: "userId" });
Registration.belongsTo(User, { foreignKey: "userId" });

Event.hasMany(Registration, { foreignKey: "eventId" });
Registration.belongsTo(Event, { foreignKey: "eventId" });

export { User, Event, Registration };

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));

// astro:db:astro:db
var astro_db_exports = {};
__reExport(astro_db_exports, config_star);
import * as config_star from "@astrojs/db/dist/runtime/config.js";

// db/config.ts
var Projects = (0, astro_db_exports.defineTable)({
  columns: {
    projectId: astro_db_exports.column.text({ primaryKey: true, unique: true }),
    projectName: astro_db_exports.column.text()
  }
});
var Users = (0, astro_db_exports.defineTable)({
  columns: {
    userId: astro_db_exports.column.text({ primaryKey: true, unique: true }),
    name: astro_db_exports.column.text(),
    email: astro_db_exports.column.text(),
    role: astro_db_exports.column.text(),
    language: astro_db_exports.column.text(),
    job: astro_db_exports.column.text({ optional: true })
  }
});
var Admins = (0, astro_db_exports.defineTable)({
  columns: {
    adminId: astro_db_exports.column.text({ primaryKey: true, unique: true }),
    name: astro_db_exports.column.text(),
    email: astro_db_exports.column.text(),
    saltedPassword: astro_db_exports.column.text(),
    language: astro_db_exports.column.text({ optional: true })
  },
  deprecated: true
});
var AdminProject = (0, astro_db_exports.defineTable)({
  columns: {
    adminRef: astro_db_exports.column.text(),
    projectRef: astro_db_exports.column.text()
  },
  foreignKeys: [
    {
      columns: ["adminRef", "projectRef"],
      references: () => [Admins.columns.adminId, Projects.columns.projectId]
    }
  ],
  deprecated: true
});
var Clients = (0, astro_db_exports.defineTable)({
  columns: {
    clientId: astro_db_exports.column.text({ primaryKey: true, unique: true }),
    projectRef: astro_db_exports.column.text({ references: () => Projects.columns.projectId }),
    name: astro_db_exports.column.text(),
    email: astro_db_exports.column.text(),
    saltedKeycode: astro_db_exports.column.text(),
    language: astro_db_exports.column.text({ optional: true })
  },
  deprecated: true
});
var Tasks = (0, astro_db_exports.defineTable)({
  columns: {
    taskId: astro_db_exports.column.text({ primaryKey: true, unique: true }),
    projectRef: astro_db_exports.column.text({ references: () => Projects.columns.projectId }),
    title: astro_db_exports.column.text(),
    description: astro_db_exports.column.text(),
    deadline: astro_db_exports.column.date({ optional: true }),
    status: astro_db_exports.column.text()
  }
});
var Comments = (0, astro_db_exports.defineTable)({
  columns: {
    commentId: astro_db_exports.column.text({ primaryKey: true, unique: true }),
    taskRef: astro_db_exports.column.text({ references: () => Tasks.columns.taskId }),
    body: astro_db_exports.column.text(),
    commenterId: astro_db_exports.column.text({ references: () => Users.columns.userId }),
    commentedAt: astro_db_exports.column.date()
  }
});
var config_default = (0, astro_db_exports.defineDb)({
  tables: { Projects, Users, Admins, AdminProject, Clients, Tasks, Comments }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXN0cm86ZGI6YXN0cm86ZGIiLCAiZGIvY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgKiBmcm9tIFwiQGFzdHJvanMvZGIvZGlzdC9ydW50aW1lL2NvbmZpZy5qc1wiIiwgImltcG9ydCB7IGRlZmluZURiLCBkZWZpbmVUYWJsZSwgY29sdW1uIH0gZnJvbSBcImFzdHJvOmRiXCI7XG5cbmNvbnN0IFByb2plY3RzID0gZGVmaW5lVGFibGUoe1xuICBjb2x1bW5zOiB7XG4gICAgcHJvamVjdElkOiBjb2x1bW4udGV4dCh7IHByaW1hcnlLZXk6IHRydWUsIHVuaXF1ZTogdHJ1ZSB9KSxcbiAgICBwcm9qZWN0TmFtZTogY29sdW1uLnRleHQoKSxcbiAgfSxcbn0pO1xuXG5jb25zdCBVc2VycyA9IGRlZmluZVRhYmxlKHtcbiAgY29sdW1uczoge1xuICAgIHVzZXJJZDogY29sdW1uLnRleHQoeyBwcmltYXJ5S2V5OiB0cnVlLCB1bmlxdWU6IHRydWUgfSksXG4gICAgbmFtZTogY29sdW1uLnRleHQoKSxcbiAgICBlbWFpbDogY29sdW1uLnRleHQoKSxcbiAgICByb2xlOiBjb2x1bW4udGV4dCgpLFxuICAgIGxhbmd1YWdlOiBjb2x1bW4udGV4dCgpLFxuICAgIGpvYjogY29sdW1uLnRleHQoeyBvcHRpb25hbDogdHJ1ZSB9KSxcbiAgfSxcbn0pO1xuXG5jb25zdCBBZG1pbnMgPSBkZWZpbmVUYWJsZSh7XG4gIGNvbHVtbnM6IHtcbiAgICBhZG1pbklkOiBjb2x1bW4udGV4dCh7IHByaW1hcnlLZXk6IHRydWUsIHVuaXF1ZTogdHJ1ZSB9KSxcbiAgICBuYW1lOiBjb2x1bW4udGV4dCgpLFxuICAgIGVtYWlsOiBjb2x1bW4udGV4dCgpLFxuICAgIHNhbHRlZFBhc3N3b3JkOiBjb2x1bW4udGV4dCgpLFxuICAgIGxhbmd1YWdlOiBjb2x1bW4udGV4dCh7IG9wdGlvbmFsOiB0cnVlIH0pLFxuICB9LFxuICBkZXByZWNhdGVkOiB0cnVlLFxufSk7XG5cbmNvbnN0IEFkbWluUHJvamVjdCA9IGRlZmluZVRhYmxlKHtcbiAgY29sdW1uczoge1xuICAgIGFkbWluUmVmOiBjb2x1bW4udGV4dCgpLFxuICAgIHByb2plY3RSZWY6IGNvbHVtbi50ZXh0KCksXG4gIH0sXG4gIGZvcmVpZ25LZXlzOiBbXG4gICAge1xuICAgICAgY29sdW1uczogW1wiYWRtaW5SZWZcIiwgXCJwcm9qZWN0UmVmXCJdLFxuICAgICAgcmVmZXJlbmNlczogKCkgPT4gW0FkbWlucy5jb2x1bW5zLmFkbWluSWQsIFByb2plY3RzLmNvbHVtbnMucHJvamVjdElkXSxcbiAgICB9LFxuICBdLFxuICBkZXByZWNhdGVkOiB0cnVlLFxufSk7XG5cbmNvbnN0IENsaWVudHMgPSBkZWZpbmVUYWJsZSh7XG4gIGNvbHVtbnM6IHtcbiAgICBjbGllbnRJZDogY29sdW1uLnRleHQoeyBwcmltYXJ5S2V5OiB0cnVlLCB1bmlxdWU6IHRydWUgfSksXG4gICAgcHJvamVjdFJlZjogY29sdW1uLnRleHQoeyByZWZlcmVuY2VzOiAoKSA9PiBQcm9qZWN0cy5jb2x1bW5zLnByb2plY3RJZCB9KSxcbiAgICBuYW1lOiBjb2x1bW4udGV4dCgpLFxuICAgIGVtYWlsOiBjb2x1bW4udGV4dCgpLFxuICAgIHNhbHRlZEtleWNvZGU6IGNvbHVtbi50ZXh0KCksXG4gICAgbGFuZ3VhZ2U6IGNvbHVtbi50ZXh0KHsgb3B0aW9uYWw6IHRydWUgfSksXG4gIH0sXG4gIGRlcHJlY2F0ZWQ6IHRydWUsXG59KTtcblxuY29uc3QgVGFza3MgPSBkZWZpbmVUYWJsZSh7XG4gIGNvbHVtbnM6IHtcbiAgICB0YXNrSWQ6IGNvbHVtbi50ZXh0KHsgcHJpbWFyeUtleTogdHJ1ZSwgdW5pcXVlOiB0cnVlIH0pLFxuICAgIHByb2plY3RSZWY6IGNvbHVtbi50ZXh0KHsgcmVmZXJlbmNlczogKCkgPT4gUHJvamVjdHMuY29sdW1ucy5wcm9qZWN0SWQgfSksXG4gICAgdGl0bGU6IGNvbHVtbi50ZXh0KCksXG4gICAgZGVzY3JpcHRpb246IGNvbHVtbi50ZXh0KCksXG4gICAgZGVhZGxpbmU6IGNvbHVtbi5kYXRlKHsgb3B0aW9uYWw6IHRydWUgfSksXG4gICAgc3RhdHVzOiBjb2x1bW4udGV4dCgpLFxuICB9LFxufSk7XG5cbmNvbnN0IENvbW1lbnRzID0gZGVmaW5lVGFibGUoe1xuICBjb2x1bW5zOiB7XG4gICAgY29tbWVudElkOiBjb2x1bW4udGV4dCh7IHByaW1hcnlLZXk6IHRydWUsIHVuaXF1ZTogdHJ1ZSB9KSxcbiAgICB0YXNrUmVmOiBjb2x1bW4udGV4dCh7IHJlZmVyZW5jZXM6ICgpID0+IFRhc2tzLmNvbHVtbnMudGFza0lkIH0pLFxuICAgIGJvZHk6IGNvbHVtbi50ZXh0KCksXG4gICAgY29tbWVudGVySWQ6IGNvbHVtbi50ZXh0KHsgcmVmZXJlbmNlczogKCkgPT4gVXNlcnMuY29sdW1ucy51c2VySWQgfSksXG4gICAgY29tbWVudGVkQXQ6IGNvbHVtbi5kYXRlKCksXG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lRGIoe1xuICB0YWJsZXM6IHsgUHJvamVjdHMsIFVzZXJzLCBBZG1pbnMsIEFkbWluUHJvamVjdCwgQ2xpZW50cywgVGFza3MsIENvbW1lbnRzIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQSw2QkFBYzs7O0FDRWQsSUFBTSxlQUFXLDhCQUFZO0FBQUEsRUFDM0IsU0FBUztBQUFBLElBQ1AsV0FBVyx3QkFBTyxLQUFLLEVBQUUsWUFBWSxNQUFNLFFBQVEsS0FBSyxDQUFDO0FBQUEsSUFDekQsYUFBYSx3QkFBTyxLQUFLO0FBQUEsRUFDM0I7QUFDRixDQUFDO0FBRUQsSUFBTSxZQUFRLDhCQUFZO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ1AsUUFBUSx3QkFBTyxLQUFLLEVBQUUsWUFBWSxNQUFNLFFBQVEsS0FBSyxDQUFDO0FBQUEsSUFDdEQsTUFBTSx3QkFBTyxLQUFLO0FBQUEsSUFDbEIsT0FBTyx3QkFB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

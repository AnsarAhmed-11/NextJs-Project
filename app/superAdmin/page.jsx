"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Bell,
  Check,
  ChevronDown,
  Clock3,
  Database,
  FolderOpen,
  ImagePlus,
  LogOut,
  MoreHorizontal,
  Search,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import styles from "./superAdmin.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import LogoutButton from "../Components/loggedOut/loggedOut";
export default function SuperAdminPage() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All roles");
  const [notice, setNotice] = useState("");
  const [uploads, setUploads] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/users");
        const apiUsers = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.users)
            ? res.data.users
            : [];
        const formattedUsers = apiUsers.map((user) => {
          const name = String(user.user_name ?? "").trim();
          const email = String(user.email ?? "No email").trim();

          const initials = name
            ? name
              .split(/\s+/)
              .filter(Boolean)
              .map((word) => word.charAt(0))
              .join("")
              .substring(0, 2)
              .toUpperCase()
            : "U";

          return {
            id: user.id,
            name,
            email,
            initials,
            tone: "blue",

            role:
              user.role === "Super_Admin" ? "Super Admin" : ["Admin", "Admin"].includes(user.role) ? "Admin" : "User",

            status: user.status ?? "Active",
            lastActive: user.lastActive ?? "—",
          };
        });
        setUsers(formattedUsers);
        console.log(users);
      } catch (error) {
        console.error("Users fetch error:", error);
      }
    };
    getData();
  }, []);


  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesQuery = `${user.name ?? ""} ${user.email ?? ""}`
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesRole =
        roleFilter === "All roles" || user.role === roleFilter;

      return matchesQuery && matchesRole;
    });
  }, [users, query, roleFilter]);

  const adminCount = users.filter(
    (user) => user.role === "Admin" || user.role === "Super Admin"
  ).length;

async function toggleRole(id) {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    console.log("current role", user.role);

    // Prevent changing the super admin's role.
    if (user.role === "Super Admin") {
      alert("You cannot change the super admin's role.");
      return;
    }
    const nextRole = user.role === "Admin" ? "User" : "Admin";

    const confirmed = window.confirm(
      `Do you want to make ${user.name} ${nextRole === "Admin" ? "as Admin" : "as User"}?`
    );

    if (!confirmed) return;

    try {
      await axios.patch(`/api/users/${id}/role`, {
        role: nextRole,
      });

      setUsers((current) =>
        current.map((u) =>
          u.id === id
            ? { ...u, role: nextRole === "Admin" ? "Admin" : "User" }
            : u
        )
      );

      setNotice(
        `${user.name} is now ${nextRole === "Admin" ? "an Admin" : "a User"}.`
      );
    } catch (err) {
      console.error(
        "Role update failed:",
        err.response?.data || err.message
      );
      setNotice("Could not update the user's role. Please try again.");
    }
  }
  function handleUpload(event) {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    const images = files.map((file) => ({ name: file.name, url: URL.createObjectURL(file) }));
    setUploads((current) => [...images, ...current].slice(0, 4));
    setNotice(`${files.length} image${files.length > 1 ? "s" : ""} ready to upload.`);
    event.target.value = "";
  }
  return (
    <main className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}><ShieldCheck size={23} /><span>Control</span></div>
        <nav className={styles.navigation} aria-label="Dashboard navigation">
          <button className={styles.navItem}><Database size={18} />Overview</button>
          <button className={`${styles.navItem} ${styles.activeNav}`}><UsersRound size={18} />User access</button>
          <Link href="/superAdmin/products" className={styles.navItem}><ImagePlus size={18} />Products</Link>
          <button className={styles.navItem}><Clock3 size={18} />Activity log</button>
        </nav>
        <div className={styles.sidebarBottom}>
          <div className={styles.helpBox}><Shield size={18} /><p>Only super admins can change access levels.</p></div>
          <button className={styles.account}><span className={`${styles.avatar} ${styles.adminAvatar}`}>SA</span><span><strong>Super Admin</strong><small>admin@northstar.co</small></span><ChevronDown size={15} /></button>
        </div>
      </aside>

      <section className={styles.content}>
        <header className={styles.topbar}>
          <div className={styles.breadcrumb}><span>Control center</span><span>/</span><strong>User access</strong></div>
          <div className={styles.headerActions}><button className={styles.iconButton} aria-label="Notifications"><Bell size={19} /><i /></button><span className={`${styles.avatar} ${styles.headerAvatar}`}>SA</span>
            <LogoutButton/>
          </div>
        </header>

        <div className={styles.pageIntro}>
          <div><p className={styles.eyebrow}>Access management</p><h1>People & permissions</h1><p>Manage who can administer your workspace and update its image library.</p></div>
          <button className={styles.inviteButton} onClick={() => setNotice("Invite flow opened. Connect this button to your backend when ready.")}><UserRound size={17} />Invite user</button>
        </div>

        {notice && <div className={styles.notice}><Check size={17} />{notice}<button onClick={() => setNotice("")} aria-label="Dismiss notice"><X size={16} /></button></div>}

        <section className={styles.metrics} aria-label="Workspace statistics">
          <article><span className={`${styles.metricIcon} ${styles.blueIcon}`}><UsersRound size={19} /></span><div><p>Total users</p><strong>{users.length}</strong><small><ArrowUpRight size={13} />2 this month</small></div></article>
          <article><span className={`${styles.metricIcon} ${styles.violetIcon}`}><ShieldCheck size={19} /></span><div><p>Administrators</p><strong>{adminCount}</strong><small>Full workspace access</small></div></article>
          <article><span className={`${styles.metricIcon} ${styles.orangeIcon}`}><ImagePlus size={19} /></span><div><p>Media assets</p><strong>{18 + uploads.length}</strong><small>Images in library</small></div></article>
        </section>

        <div className={styles.workspaceGrid}>
          <section className={styles.panel}>
            <div className={styles.panelHeading}>
              <div>
                <h2>Workspace members</h2>
                <p>Assign administrator privileges to trusted users.</p></div><button className={styles.moreButton} aria-label="Member options">
                <MoreHorizontal size={20} />
              </button></div>
            <div className={styles.tableTools}>
              <label className={styles.search}><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search people" aria-label="Search people" /></label>
              <label className={styles.filter}><SlidersHorizontal size={16} /><select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)} aria-label="Filter by role"><option>All roles</option><option>Admin</option><option>User</option></select></label>
            </div>
            <div className={styles.memberTable}>
              <div className={`${styles.tableRow} ${styles.tableHeader}`}><span>Member</span><span>Role</span><span>Status</span><span>Last active</span><span aria-label="Actions" /></div>
              {filteredUsers.map((user) => (
                <div className={styles.tableRow} key={user.id}>

                  {/* MEMBER */}
                  <span className={styles.person}>
                    <span className={`${styles.avatar} ${styles.blue}`}>
                      {user.initials}
                    </span>

                    <span className={styles.userInfo}>
                      <strong>{user.name || "Unknown User"}</strong>
                      <small>{user.email || "No email"}</small>
                    </span>
                  </span>

                  {/* ROLE */}
                  <span>
                    <button
                      type="button"
                      className={`${styles.roleBadge} ${user.role === "Admin"
                        ? styles.adminRole
                        : styles.userRole
                        }`}
                      onClick={(e) => toggleRole(user.id)}
                    >
                      {user.role === "Admin" ? (
                        <ShieldCheck size={14} />
                      ) : (
                        <UserRound size={14} />
                      )}

                      {user.role}
                    </button>
                  </span>

                  {/* STATUS */}
                  <span
                    className={`${styles.status} ${user.status === "Active"
                      ? styles.statusActive
                      : styles.statusPending
                      }`}
                  >
                    <i />
                    {user.status}
                  </span>

                  {/* LAST ACTIVE */}
                  <span className={styles.lastActive}>
                    {user.lastActive}
                  </span>

                  {/* ACTION */}
                  <button
                    type="button"
                    className={styles.rowMenu}
                    aria-label={`More options for ${user.name}`}
                  >
                    <MoreHorizontal size={19} />
                  </button>

                </div>
              ))}
            </div>
            <div className={styles.tableFooter}><span>Showing {filteredUsers.length} of {users.length} members</span><div><button disabled>Previous</button><button>Next</button></div></div>
          </section>

          <aside className={styles.rightRail}>
            <section className={`${styles.panel} ${styles.activityPanel}`}>
              <div className={styles.panelHeading}><div><h2>Recent activity</h2><p>Latest workspace changes</p></div><button className={styles.viewAll} onClick={() => setNotice("Activity log opened.")}>View all</button></div>
              <ul className={styles.activityList}>
                <li><span className={`${styles.activityIcon} ${styles.blueIcon}`}><ShieldCheck size={15} /></span><p><strong>Olivia Bennett</strong> was made an admin<small>10 minutes ago</small></p></li>
                <li><span className={`${styles.activityIcon} ${styles.orangeIcon}`}><ImagePlus size={15} /></span><p><strong>3 images</strong> were added to the library<small>Yesterday at 4:23 PM</small></p></li>
                <li><span className={`${styles.activityIcon} ${styles.violetIcon}`}><UserRound size={15} /></span><p><strong>Maya Patel</strong> joined the workspace<small>Yesterday at 11:08 AM</small></p></li>
              </ul>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

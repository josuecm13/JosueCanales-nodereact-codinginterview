import React, { FC, useState, useEffect } from "react";

import { RouteComponentProps } from "@reach/router";
import { IUserProps } from "../dtos/user.dto";
import { UserCard } from "../components/users/user-card";
import { BackendClient } from "../clients/backend.client";
import { Button, CircularProgress, MenuItem, Select } from "@material-ui/core";

const backendClient = new BackendClient();

export const DashboardPage: FC<RouteComponentProps> = () => {
  const [users, setUsers] = useState<IUserProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const result = await backendClient.getAllUsers(page, limit);
      setUsers(result.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [page, limit]);

  return (
    <div style={{ paddingTop: "30px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress size="60px" />
          </div>
        ) : (
          <>
            <div>
              {users.length
                ? users.map((user) => {
                    return <UserCard key={user.id} {...user} />;
                  })
                : null}
            </div>
            <Button onClick={() => setPage(p => p - 1)} disabled={page === 1}>Previous Page</Button>
            <Button onClick={() => setPage(p => p + 1)}>Next Page</Button>
            <Select value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </>
        )}
      </div>
    </div>
  );
};

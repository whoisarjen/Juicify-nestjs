import { useRouter } from "next/router";
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import SearchBox from "../../common/input-search";
import Avatar from "../../common/avatar";
import { useSearchProps } from "./useSearch";

const BaseSearch = ({ data, router }: useSearchProps) => {
    return (
        <div>
            <SearchBox />
            <List sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '12px' }}>
                {
                    data?.items?.map((user: any) =>
                        <ListItemButton onClick={() => router.push(`/${user.login}`)} key={user.id}>
                            <ListItemAvatar>
                                <Avatar user={user} size="40px" />
                            </ListItemAvatar>
                            <ListItemText primary={user.login} secondary={`${user.name} ${user.surname}`} />
                        </ListItemButton>
                    )
                }
            </List>
        </div>
    );
};

export default BaseSearch;
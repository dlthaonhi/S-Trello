import { authorizedAxiosHttpClient } from '../http-client'

export function getBoardDetailBySlug(slug) {
  console.log(slug)
  return {
    id: '1',
    name: 'Test Board',
    lists: [
      {
        id: '1',
        name: 'To Do',
        tasks: [
          {
            id: '1',
            name: 'Task 1',
            description: 'Description 1',
            dueDate: '2021-09-30T00:00:00.000Z'
          }
        ]
      },
      {
        id: '2',
        name: 'In Progress',
        tasks: [
          {
            id: '1',
            name: 'Task 1',
            description: 'Description 1',
            dueDate: '2021-09-30T00:00:00.000Z'
          },
          {
            id: '2',
            name: 'Task 2',
            description: 'Description 1',
            dueDate: '2021-09-30T00:00:00.000Z'
          }
        ]
      },
      {
        id: '3',
        name: 'Resolved',
        tasks: []
      }
    ]
  }
  // return authorizedAxiosHttpClient.request({
  //   url: `/boards/${slug}/lists`,
  //   method: 'get'
  // })
}

export function getCardDetailById(id) {
  console.log('Get card detail by id:', id)
  const data = {
    id: 'a35452c5-4756-414d-8006-de01d616cfd5',
    title: 'Tuần 18',
    start_date: 1714780800000,
    due_date: 1715299200000,
    files: [
      {
        bytes: 49491,
        date: '2024-07-30T02:03:09.393Z',
        edgeColor: '#f2f3f3',
        fileName: 'image.png',
        id: '66a84a30c638d304b773c32a',
        idMember: '66a84a30c638d304b773c329',
        isUpload: true,
        mimeType: 'image/png',
        name: 'image.png',
        url: 'https://api.myhome.vi-jp-te.info/api/v1/storages/my-home-dev/o/1706175370713-7a7e2ebc0304cf5a96151.jpg'
      },
      {
        bytes: 49491,
        date: '2024-07-30T02:02:50.605Z"',
        edgeColor: '#efeff1',
        fileName: 'image.png',
        id: '66a84a30c638d304b773c321',
        idMember: '66a84a30c638d304b773c329',
        isUpload: true,
        mimeType: 'image/png',
        name: 'image.png',
        url: 'https://i.imgur.com/sduLRvf.jpeg'
      }
    ],
    // background: [
    //   'backgroundColor',
    //   '#0079bf'
    // ],
    background: {
      image:
        'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/d6bb9f3d68fea3cdcc7019af71bb1e7a/photo-1722011016023-29c1810ffbb0.webp',
      color: 'rgb(174, 165, 148)'
    },
    description:
      '<ul><li>User Story: As a user, from the board detail view, I want to navigate between boards in the workspace or navigate to member list/board setting.</li><li>Acceptance criteria:</li><li>A side bar for board detail view that consist of:</li><li>Collection of lists (danh sách) that containg cards:</li><li>Title:</li><li class="ql-indent-1">User can change the list .</li><li class="ql-indent-1">Thành viên: Showing member view.</li><li class="ql-indent-1">Các cài đặt Không gian làm việc: Showing board settings.</li><li>Board list:</li><li class="ql-indent-1">Showing list of board in that specifc workspace.</li><li class="ql-indent-1">User can move to card list view upon clicking.</li><li class="ql-indent-1">User can add new board by clicking on the + button.</li></ul>',
    checklists: [
      {
        id: 'd365c62b-db47-4975-8e7e-1a8f0b12581c',
        task_id: 'a35452c5-4756-414d-8006-de01d616cfd5',
        title: 'Truyền',
        position: 65536,
        items: [
          {
            id: '18baf516-bba5-474b-b9c7-dc2d2901ee49',
            checklist_id: 'd365c62b-db47-4975-8e7e-1a8f0b12581c',
            title:
              'Trong quá trình sử dụng blog, bạn có thể sửa đổi một số thông tin sau: Sửa đổi nội dung trong bài viết đã đăng; Xóa một bài viết đã đăng; Xóa nhiều bài viết',
            completed: true,
            position: 32768
          },
          {
            id: '1024ca3d-dd39-4483-aac5-257a882094e8',
            checklist_id: 'd365c62b-db47-4975-8e7e-1a8f0b12581c',
            title: 'Cộng đồng cho Instructor',
            completed: true,
            position: 65536
          },
          {
            id: 'b461ad6a-e8f9-4739-8b77-86164cb2ad42',
            checklist_id: 'd365c62b-db47-4975-8e7e-1a8f0b12581c',
            title: 'Nhúng code vào bài viết (Cộng đồng)',
            completed: false,
            position: 163840
          },
          {
            id: '68c9cad5-ca6c-4dc1-b6b6-9e026d21e81f',
            checklist_id: 'd365c62b-db47-4975-8e7e-1a8f0b12581c',
            title: 'Research SEO cho cộng đồng',
            completed: false,
            position: 196608
          }
        ]
      },
      {
        id: 'bc421249-bc06-4cd0-8362-9a498ea743fa',
        task_id: 'a35452c5-4756-414d-8006-de01d616cfd5',
        title: 'Nam',
        position: 131072,
        items: [
          {
            id: 'd5fe7bc0-d13c-40c0-abb7-ece79ae8gsg',
            checklist_id: 'bc421249-bc06-4cd0-8362-9a498ea743fa',
            title: 'S-group management admin',
            completed: true,
            position: 65536
          },
          {
            id: '336d0245-1622-47f0-1d5ced40760a',
            checklist_id: 'bc421249-bc06-4cd0-8362-9a498ea743fa',
            title: 'S-group management landing page',
            completed: true,
            position: 131072
          },
          {
            id: '31ffc0f54-49a1-a69e-8b750f20469a',
            checklist_id: 'bc421249-bc06-4cd0-8362-9a498ea743fa',
            title: 'S-work drive',
            completed: true,
            position: 196608
          }
        ]
      },
      {
        id: 'bc421249-bc06-4cd0-8362-9a498ea7',
        task_id: 'a35452c5-4756-414d-8006-de01d616cfd5',
        title: 'Kenji Cao',
        position: 131072,
        items: [
          {
            id: 'd5fe7bc0-d13c-40c0-abb7-ece79ae8ef4b',
            checklist_id: 'bc421249-bc06-4cd0-8362-9a498ea743fa',
            title: 'Detail board',
            completed: false,
            position: 65536
          },
          {
            id: '336d0245-1622-47f0-901d-1d5ced40760a',
            checklist_id: 'bc421249-bc06-4cd0-8362-9a498ea743fa',
            title: 'List project, detail project',
            completed: false,
            position: 131072
          },
          {
            id: '31ffc0f1-2a54-49a1-a69e-8b750f20469a',
            checklist_id: 'bc421249-bc06-4cd0-8362-9a498ea743fa',
            title: 'Đòi nợ cho S-Group',
            completed: true,
            position: 196608
          },
          {
            id: '31ffc0f1-2a54-4e-8b750f20469a',
            checklist_id: 'bc421249-bc06-4cd0-8362-9a498ea743fa',
            title: 'Sửa máy giặt cho group',
            completed: false,
            position: 196608
          }
        ]
      }
    ],
    members: [
      {
        id: 'f13ee1ea-2228-4aa8-beb5-1a78815dc6cd',
        first_name: 'Truyền',
        last_name: 'Nguyễn Đức',
        avatar:
          'https://storage.googleapis.com/download/storage/v1/b/sucodev-prod/o/1693294135274-99408387-422D-4A49-8BC2-665259B25C08.jpeg?generation=1693294154495696&alt=media',
        email: 'mrtruyenbd1407+1@gmail.com',
        user_id: 'ec5ff625-91c2-4f84-a790-1c0740e40a94',
        sub_id: '7d3c2f39-732a-4d24-adce-1ffc296be763',
        active: true
      },
      {
        id: 'd01da5f1-b781-4795-922e-e57b4af4d9c3',
        first_name: 'Thanh Nhàn',
        last_name: 'Phan Thị',
        avatar:
          'https://trello-members.s3.amazonaws.com/6400d7d73c11c1c724d6235f/41c5d6164997cc1cd0c6753dc3819875/170.png',
        email: 'nhanphanththanh@gmail.com',
        user_id: '8c644b50-b3f2-4941-a18c-d82c433081ff',
        sub_id: 'b61971c8-71aa-448b-a15c-5d121dab8dda',
        active: true
      }
    ],
    not_seen: false,
    total_item: 0,
    total_item_completed: 0,
    board_id: '4d2fabbd-de46-4f6d-b898-c9f090b5f021',
    group_id: '08b81105-0a32-4ad5-ab13-a54707721acf',
    current_position: {
      board: {
        board_id: '4d2fabbd-de46-4f6d-b898-c9f090b5f021',
        board_name: 'Board 1'
      },
      group: {
        group_id: '08b81105-0a32-4ad5-ab13-a54707721acf',
        group_name: 'Todo',
        position: 1
      }
    },
    labels: ['12345', '1234567'],
    actions: [
      {
        id: '66ad884d962dbb9e733da6cd',
        idMemberCreator: '6489784eab92ffeb9e31e9c5',
        data: {
          text: '<p>Các nội dung cần sửa như sau:</p><ol><li>Header -&gt; Thêm dropdown</li><li>Banner -&gt; thêm setTimeout</li></ol><p><br></p>',
          textData: {
            emoji: {}
          },
          card: {
            id: '66a84a30c638d304b773c2f8',
            name: 'As a user, from the board detail view, I want to open a card to change the title and description, I also want to see who is in charge of it.',
            idShort: 36,
            shortLink: 'vvUv5mtA'
          },
          board: {
            id: '6674aec55f6e8fed5b6f73c4',
            name: 'Specialized Training FE Project',
            shortLink: 'mxzQV8kk'
          },
          list: {
            id: '6674aec55f6e8fed5b6f73c7',
            name: 'To Do'
          },
          dateLastEdited: '2024-08-03T01:47:07.050Z'
        },
        appCreator: null,
        type: 'commentCard',
        date: '2024-08-03T01:30:53.846Z',
        limits: {
          reactions: {
            perAction: {
              status: 'ok',
              disableAt: 900,
              warnAt: 720
            },
            uniquePerAction: {
              status: 'ok',
              disableAt: 17,
              warnAt: 14
            }
          }
        },
        display: {
          translationKey: 'action_comment_on_card',
          entities: {
            contextOn: {
              type: 'translatable',
              translationKey: 'action_on',
              hideIfContext: true,
              idContext: '66a84a30c638d304b773c2f8'
            },
            card: {
              type: 'card',
              hideIfContext: true,
              id: '66a84a30c638d304b773c2f8',
              shortLink: 'vvUv5mtA',
              text: 'As a user, from the board detail view, I want to open a card to change the title and description, I also want to see who is in charge of it.'
            },
            comment: {
              type: 'comment',
              text: 'fasdg**gsadgasgasdg**\n\n1. dsgsag\n2. `safsafdsafdsadfsd`\n3. fsafdasfasfdasdf\n4. ~~safsafsafdsafdsafsafsafasfsaf~~\n   1. gsdgsd\n      1. ghdsfhhdgsfh\n         ![image.png](https://trello.com/1/cards/66a84a30c638d304b773c2f8/attachments/66a84a30c638d304b773c32a/download/image.png)'
            },
            memberCreator: {
              type: 'member',
              id: '6489784eab92ffeb9e31e9c5',
              username: 'truynnguyndc',
              text: 'Truyền Nguyễn Đức'
            }
          }
        },
        memberCreator: {
          id: '6489784eab92ffeb9e31e9c5',
          activityBlocked: false,
          avatarUrl:
            'https://storage.googleapis.com/download/storage/v1/b/sucodev-prod/o/1693294135274-99408387-422D-4A49-8BC2-665259B25C08.jpeg?generation=1693294154495696&alt=media',
          bio: '',
          bioData: null,
          confirmed: true,
          fullName: 'Truyền Nguyễn Đức',
          idEnterprise: null,
          idMemberReferrer: null,
          initials: 'TĐ',
          memberType: 'normal',
          nonPublic: {
            fullName: 'Truyền Nguyễn Đức',
            avatarUrl:
              'https://storage.googleapis.com/download/storage/v1/b/sucodev-prod/o/1693294135274-99408387-422D-4A49-8BC2-665259B25C08.jpeg?generation=1693294154495696&alt=media',
            avatarHash: '30626bd386e733d5c0dbc47cc5856f1c'
          },
          url: 'https://trello.com/truynnguyndc',
          username: 'truynnguyndc',
          idPremOrgsAdmin: []
        },
        reactions: []
      }
      // {
      //   id: 'e2c0a4f4-5f9d-4c5c-9d6e-6f3b3c5e7b8b',
      //   title: 'Task Backend High-level',
      //   background: '#f27256',
      //   color: '#fff'
      // },
      // {
      //   id: 'e2c0a4f4-5f9d-4c5c-9d6e-6f3b3c5e7b8sb',
      //   title: 'Task Backend High-level Have to do',
      //   background: '#734112',
      //   color: '#fff'
      // }
    ],
    actions: [
      {
        id: '66ad884d962dbb9e733da6cd',
        idMemberCreator: '6489784eab92ffeb9e31e9c5',
        data: {
          text: '<p>Các nội dung cần sửa như sau:</p><ol><li>Header -&gt; Thêm dropdown</li><li>Banner -&gt; thêm setTimeout</li></ol><p><br></p>',
          textData: {
            emoji: {}
          },
          card: {
            id: '66a84a30c638d304b773c2f8',
            name: 'As a user, from the board detail view, I want to open a card to change the title and description, I also want to see who is in charge of it.',
            idShort: 36,
            shortLink: 'vvUv5mtA'
          },
          board: {
            id: '6674aec55f6e8fed5b6f73c4',
            name: 'Specialized Training FE Project',
            shortLink: 'mxzQV8kk'
          },
          list: {
            id: '6674aec55f6e8fed5b6f73c7',
            name: 'To Do'
          },
          dateLastEdited: '2024-08-03T01:47:07.050Z'
        },
        appCreator: null,
        type: 'commentCard',
        date: '2024-08-03T01:30:53.846Z',
        limits: {
          reactions: {
            perAction: {
              status: 'ok',
              disableAt: 900,
              warnAt: 720
            },
            uniquePerAction: {
              status: 'ok',
              disableAt: 17,
              warnAt: 14
            }
          }
        },
        display: {
          translationKey: 'action_comment_on_card',
          entities: {
            contextOn: {
              type: 'translatable',
              translationKey: 'action_on',
              hideIfContext: true,
              idContext: '66a84a30c638d304b773c2f8'
            },
            card: {
              type: 'card',
              hideIfContext: true,
              id: '66a84a30c638d304b773c2f8',
              shortLink: 'vvUv5mtA',
              text: 'As a user, from the board detail view, I want to open a card to change the title and description, I also want to see who is in charge of it.'
            },
            comment: {
              type: 'comment',
              text: 'fasdg**gsadgasgasdg**\n\n1. dsgsag\n2. `safsafdsafdsadfsd`\n3. fsafdasfasfdasdf\n4. ~~safsafsafdsafdsafsafsafasfsaf~~\n   1. gsdgsd\n      1. ghdsfhhdgsfh\n         ![image.png](https://trello.com/1/cards/66a84a30c638d304b773c2f8/attachments/66a84a30c638d304b773c32a/download/image.png)'
            },
            memberCreator: {
              type: 'member',
              id: '6489784eab92ffeb9e31e9c5',
              username: 'truynnguyndc',
              text: 'Truyền Nguyễn Đức'
            }
          }
        },
        memberCreator: {
          id: '6489784eab92ffeb9e31e9c5',
          activityBlocked: false,
          avatarUrl:
            'https://storage.googleapis.com/download/storage/v1/b/sucodev-prod/o/1693294135274-99408387-422D-4A49-8BC2-665259B25C08.jpeg?generation=1693294154495696&alt=media',
          bio: '',
          bioData: null,
          confirmed: true,
          fullName: 'Truyền Nguyễn Đức',
          idEnterprise: null,
          idMemberReferrer: null,
          initials: 'TĐ',
          memberType: 'normal',
          nonPublic: {
            fullName: 'Truyền Nguyễn Đức',
            avatarUrl:
              'https://storage.googleapis.com/download/storage/v1/b/sucodev-prod/o/1693294135274-99408387-422D-4A49-8BC2-665259B25C08.jpeg?generation=1693294154495696&alt=media',
            avatarHash: '30626bd386e733d5c0dbc47cc5856f1c'
          },
          url: 'https://trello.com/truynnguyndc',
          username: 'truynnguyndc',
          idPremOrgsAdmin: []
        },
        reactions: []
      }
      // {
      //   id: 'e2c0a4f4-5f9d-4c5c-9d6e-6f3b3c5e7b8b',
      //   title: 'Task Backend High-level',
      //   background: '#f27256',
      //   color: '#fff'
      // },
      // {
      //   id: 'e2c0a4f4-5f9d-4c5c-9d6e-6f3b3c5e7b8sb',
      //   title: 'Task Backend High-level Have to do',
      //   background: '#734112',
      //   color: '#fff'
      // }
    ],
    actions: [
      {
        id: '66ad884d962dbb9e733da6cd',
        idMemberCreator: '6489784eab92ffeb9e31e9c5',
        data: {
          text: '<p>Các nội dung cần sửa như sau:</p><ol><li>Header -&gt; Thêm dropdown</li><li>Banner -&gt; thêm setTimeout</li></ol><p><br></p>',
          textData: {
            emoji: {}
          },
          card: {
            id: '66a84a30c638d304b773c2f8',
            name: 'As a user, from the board detail view, I want to open a card to change the title and description, I also want to see who is in charge of it.',
            idShort: 36,
            shortLink: 'vvUv5mtA'
          },
          board: {
            id: '6674aec55f6e8fed5b6f73c4',
            name: 'Specialized Training FE Project',
            shortLink: 'mxzQV8kk'
          },
          list: {
            id: '6674aec55f6e8fed5b6f73c7',
            name: 'To Do'
          },
          dateLastEdited: '2024-08-03T01:47:07.050Z'
        },
        appCreator: null,
        type: 'commentCard',
        date: '2024-08-03T01:30:53.846Z',
        limits: {
          reactions: {
            perAction: {
              status: 'ok',
              disableAt: 900,
              warnAt: 720
            },
            uniquePerAction: {
              status: 'ok',
              disableAt: 17,
              warnAt: 14
            }
          }
        },
        display: {
          translationKey: 'action_comment_on_card',
          entities: {
            contextOn: {
              type: 'translatable',
              translationKey: 'action_on',
              hideIfContext: true,
              idContext: '66a84a30c638d304b773c2f8'
            },
            card: {
              type: 'card',
              hideIfContext: true,
              id: '66a84a30c638d304b773c2f8',
              shortLink: 'vvUv5mtA',
              text: 'As a user, from the board detail view, I want to open a card to change the title and description, I also want to see who is in charge of it.'
            },
            comment: {
              type: 'comment',
              text: 'fasdg**gsadgasgasdg**\n\n1. dsgsag\n2. `safsafdsafdsadfsd`\n3. fsafdasfasfdasdf\n4. ~~safsafsafdsafdsafsafsafasfsaf~~\n   1. gsdgsd\n      1. ghdsfhhdgsfh\n         ![image.png](https://trello.com/1/cards/66a84a30c638d304b773c2f8/attachments/66a84a30c638d304b773c32a/download/image.png)'
            },
            memberCreator: {
              type: 'member',
              id: '6489784eab92ffeb9e31e9c5',
              username: 'truynnguyndc',
              text: 'Truyền Nguyễn Đức'
            }
          }
        },
        memberCreator: {
          id: '6489784eab92ffeb9e31e9c5',
          activityBlocked: false,
          avatarUrl:
            'https://storage.googleapis.com/download/storage/v1/b/sucodev-prod/o/1693294135274-99408387-422D-4A49-8BC2-665259B25C08.jpeg?generation=1693294154495696&alt=media',
          bio: '',
          bioData: null,
          confirmed: true,
          fullName: 'Truyền Nguyễn Đức',
          idEnterprise: null,
          idMemberReferrer: null,
          initials: 'TĐ',
          memberType: 'normal',
          nonPublic: {
            fullName: 'Truyền Nguyễn Đức',
            avatarUrl:
              'https://storage.googleapis.com/download/storage/v1/b/sucodev-prod/o/1693294135274-99408387-422D-4A49-8BC2-665259B25C08.jpeg?generation=1693294154495696&alt=media',
            avatarHash: '30626bd386e733d5c0dbc47cc5856f1c'
          },
          url: 'https://trello.com/truynnguyndc',
          username: 'truynnguyndc',
          idPremOrgsAdmin: []
        },
        reactions: []
      }
    ]
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data })
    }, 500)
  })
}

export function getBoardData() {
  const members = [
    {
      id: 'f13ee1ea-2228-4aa8-beb5-1a78815dc6cd',
      first_name: 'Truyền',
      last_name: 'Nguyễn Đức',
      avatar:
        'https://storage.googleapis.com/download/storage/v1/b/sucodev-prod/o/1693294135274-99408387-422D-4A49-8BC2-665259B25C08.jpeg?generation=1693294154495696&alt=media',
      email: 'mrtruyenbd1407+1@gmail.com',
      user_id: 'ec5ff625-91c2-4f84-a790-1c0740e40a94',
      sub_id: '7d3c2f39-732a-4d24-adce-1ffc296be763',
      active: true
    },
    {
      id: '92a3cbd4-e136-40ff-acfc-cd14af40122e',
      first_name: 'Tuấn Kiệt',
      last_name: 'Cao',
      avatar:
        'https://trello-members.s3.amazonaws.com/63827ed24eceea25d86f5c63/6b230dfc8dcc518258f76f8c459712d1/170.png',
      email: 'tunkitcao1@gmail.com',
      user_id: '6389a2db-10b9-45e3-9380-a583063f2378',
      sub_id: '04cb32fc-cfa2-4122-9591-dd703d9c2f62',
      active: true
    },
    {
      id: 'd01da5f1-b781-4795-922e-e57b4af4d9c3',
      first_name: 'Thanh Nhàn',
      last_name: 'Phan Thị',
      avatar:
        'https://trello-members.s3.amazonaws.com/6400d7d73c11c1c724d6235f/41c5d6164997cc1cd0c6753dc3819875/170.png',
      email: 'nhanphanththanh@gmail.com',
      user_id: '8c644b50-b3f2-4941-a18c-d82c433081ff',
      sub_id: 'b61971c8-71aa-448b-a15c-5d121dab8dda',
      active: true
    }
  ]
  const labels = [
    { id: '123', background: '#AE4787', title: 'Task Frontend', color: '#FFFFFF' },
    { id: '1234', background: '#F5CD47', title: 'Task Backend', color: '#533F04' },
    { id: '12345', background: '#8590A2', title: 'Detail Main', color: '#091E42' },
    { id: '123456', background: '#579DFF', title: 'Daskie Leak', color: '#09326C' },
    { id: '1234567', background: '#C9372C', title: 'Yan Duanen', color: '#FFFFFF' },
    { id: '123456789', background: '#9F8FEF', title: 'Bluna ft Juan', color: '#352C63' }
  ]
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ members, labels })
    }, 500)
  })
}
export function createBoard(id, data) {
  return authorizedAxiosHttpClient.request({
    url: `projects/${id}/boards`,
    method: 'post',
    data
  })
}

import React from 'react';

import { useApiAxios } from 'base/api/base';
import { useAuth } from 'base/hooks/AuthContext';
import useFieldValues from 'base/hooks/useFieldValues';

const INITIAL_STATE = { username: '', password: '' };

function LoginForm() {
  const [, , login] = useAuth();
  const { handleFieldChange, fieldValues } = useFieldValues(INITIAL_STATE);

  const [{ error }, refetch] = useApiAxios(
    {
      url: '/accounts/api/token/',
      method: 'POST',
    },
    { manual: true },
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    refetch({ data: fieldValues })
      .then((response) => {
        const { access, refresh, user_id, is_staff, username, nickname } =
          response.data;
        login({
          access,
          refresh,
          user_id,
          is_staff,
          username,
          nickname,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="">
      <div className="">
        <div className="">
          <div>
            <h2 className="">로그인</h2>
            <form onSubmit={handleSubmit}>
              <div className="">
                <input
                  type="text"
                  name="username"
                  autoComplete="off"
                  value={fieldValues.username}
                  onChange={handleFieldChange}
                  placeholder="아이디를 입력해주세요."
                  className=""
                />
              </div>
              <div className="">
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="off"
                  value={fieldValues.password}
                  onChange={handleFieldChange}
                  placeholder="비밀번호를 입력해주세요."
                  className=""
                />
              </div>
              <button type="submit" className="">
                들어가기
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;

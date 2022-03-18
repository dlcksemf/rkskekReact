import { useApiAxios } from 'base/api/base';
import useFieldValues from 'base/hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';

const INIT_FILED_VALUES = {
  username: '',
  nickname: '',
  birthdate: '',
  password: '',
  password2: '',
};

function SignupForm() {
  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FILED_VALUES);
  const navigate = useNavigate();

  const [{ loading, error, errorMessages }, signup] = useApiAxios(
    {
      url: 'accounts/api/signup/',
      method: 'POST',
    },
    { manual: true },
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    signup({ data: fieldValues })
      .then((response) => {
        navigate('/accounts/login/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {error &&
        `가입에 실패하였습니다. (${error.response?.status} ${error.response?.statusText})`}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className=""
            name="username"
            value={fieldValues.username}
            onChange={handleFieldChange}
            placeholder="이름을 입력해주세요."
          />
          {errorMessages.username?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>
        <div>
          <input
            type="text"
            name="nickname"
            value={fieldValues.nickname}
            onChange={handleFieldChange}
            placeholder="닉네임을 입력해주세요."
            className=""
          />
        </div>
        <div>
          <input
            type="date"
            name="birthdate"
            value={fieldValues.birthdate}
            onChange={handleFieldChange}
            placeholder="생일을 입력해주세요."
            className=""
          />
        </div>

        <div>
          <input
            name="password"
            type="password"
            value={fieldValues.password}
            onChange={handleFieldChange}
            placeholder="비밀번호를 입력해주세요."
            className=""
          />
          {errorMessages.password?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div>
          <input
            name="password2"
            type="password"
            value={fieldValues.password2}
            onChange={handleFieldChange}
            placeholder="비밀번호를 한 번 더 입력해주세요."
            className=""
          />
          {errorMessages.non_field_errors?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>

        <button className="" onClick={handleSubmit}>
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
